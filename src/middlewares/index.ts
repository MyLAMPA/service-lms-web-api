
import { v4 as uuidv4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import {
    Request,
    Response,
    NextFunction,
} from 'express'
import * as _ from 'lodash'
import * as joi from 'joi'
import * as graphql from 'graphql'

import { config } from '../config'
import { JsonError, httpErrors as errors, authErrors } from '../errors'
import {
    IDCtx,
} from '../types'
import { logger } from '../components/logger'

const { accessKey } = config.auth

export const authorizeRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessKeyId: string = _.has(req.headers, 'x-access-key-id') ?
            <string>_.get(req.headers, 'x-access-key-id') : null
        
        const accessKeySecret: string = _.has(req.headers, 'x-secret-access-key') ?
            <string>_.get(req.headers, 'x-secret-access-key') : null

        if (accessKeyId === accessKey.id && accessKeySecret === accessKey.secret) {
            return next()
        }

        throw errors.unauthorized('Invalid Access Key')
    } catch (err) {
        req.state.logger.warn({ err }, 'Request Authorization Failed')
        return next(errors.unauthorized('Request Authorization Failed'))
    }
}

export const authorizeUserRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let authorizationHeader: string = null
        if (_.has(req.headers, 'authorization')) {
            authorizationHeader = <string>_.get(req.headers, 'authorization')
        }

        if (!!authorizationHeader && !/^\s*$/.test(authorizationHeader)) {
            if (
                authorizationHeader.split(' ')[0] !== 'Bearer' ||
                !_.isString(authorizationHeader.split(' ')[1])
            ) {
                throw authErrors.unknownAuthorizationHeader()
            }
    
            const credentials: string = authorizationHeader.split(' ')[1]
            const { userId, primaryEmailAddress, emailAddresses } = await <IDCtx>jwt.verify(credentials, config.auth.accessTokenSecret)
    
            req.state.idCtx = { userId, primaryEmailAddress, emailAddresses }

            return next()
        }

        if (config.auth.enablePublicReadProxy) {
            req.state.idCtx = {
                virtual: true,
                userId: null,
                primaryEmailAddress: null,
                emailAddresses: null,
            }
            return next()
        }

        throw authErrors.unknownAuthorizationHeader()
    } catch (err) {
        req.state.logger.warn({ err }, 'Request Authorization Failed')
        return next(errors.unauthorized('Invalid Credentials'))
    }
}

export const handleController =
    (controller: (req?: Request, res?: Response) => any, useStandardHandler: boolean = true) =>
        async(req: Request, res: Response, next: NextFunction) => {
            try {
                req.state.out = await controller(req, res)
                if (useStandardHandler) {
                    return next()
                }
            } catch (err) {
                return next(err)
            }
        }

export const validateReqParams =
    (schema: object, allowUnknown = true) =>
        async (req: Request, res: Response, next: NextFunction) => {
        const result = joi.validate(req, schema, { allowUnknown })
        if (_.isObject(result.error)) {
            return next(errors.badRequest(_.get(result, 'error.message')))
        }

        return next()
    }

export const jsonErrorSerializer = (err: JsonError): object => {
    let name = null
    if (_.has(err, 'name')) {
        name = _.get(err, 'name')
    }

    let message = null
    if (_.has(err, 'message')) {
        message = _.get(err, 'message')
    }

    let code = null
    if (_.has(err, 'errorCode')) {
        code = _.get(err, 'errorCode')
    }

    const serialized: any = { name, message, code }

    if (config.params.sendErrorStackTrace) {
        serialized.stack = _.get(err, 'stack')
    }

    return serialized
}

export const parseGraphqlError = (error: graphql.GraphQLError) => {
    let jsonError = null
    if (_.has(error, 'originalError')) {
        jsonError = jsonErrorSerializer(_.get(error, 'originalError') as JsonError)
    }

    return {
        jsonError,
        message: _.get(error, 'message'),
        locations: _.get(error, 'locations'),
        path: _.get(error, 'path'),
    }
}

function errorOutputSerializer(err: any): object {
    const data = _.get(err, 'body.data')
    if (_.isArray(data) && data.length > 0 && _.isObject(data[0])) {
        let messages = ''
        data.forEach(({ message }) => messages = `${messages} ${message}`)
        return { message: messages }
    }

    const serialized: any = jsonErrorSerializer(err)

    if (_.has(err, 'httpStatus')) {
        serialized.status = _.get(err, 'httpStatus')
    }

    return serialized
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!_.isNumber(err.httpStatus)) {
        err.httpStatus = 500
    }

    res.status(err.httpStatus)
    req.state.logger.error({ err, req, res }, 'Error handler at the end of app')

    const serializedError: object = errorOutputSerializer(err)

    return res.json({ error: serializedError })
}

export const standardHandler = (req: Request, res: Response, next: NextFunction) => {
    if (_.has(req, 'state.out')) {
        req.state.logger.info({ req, res }, 'Standard output')
        return res.json(req.state.out)
    }

    res.status(404)
    req.state.logger.info({ req, res }, 'Standard output 404')
    return res.json(errors.notFound())
}

export function commonTrackers(req: Request, res: Response, next: NextFunction) {
    const correlationId = req.header('X-Correlation-Id') || uuidv4()

    req.state = req.state || {}

    req.state.correlationId = correlationId
    res.set('X-Correlation-Id', correlationId)

    return next()
}

export function appendChildLogger(req: Request, res: Response, next: NextFunction) {
    req.state.logger = logger.child({ correlationId: req.state.correlationId })
    return next()
}

export function initialLog(req: Request, res: Response, next: NextFunction) {
    req.state.logger.info({ req, res }, 'Initial Info')
    return next()
}
