
import {
    Request,
    Response,
    NextFunction,
} from 'express'
import { v4 as uuidv4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import * as joi from 'joi'
import * as _ from 'lodash'

import { config } from '../config'
import { httpErrors as errors, authErrors } from '../errors'
import {
    TokenBody,
    UserRole,
    CRUD,
} from '../models'
import { logger } from '../components/logger'
import * as accessesServices from '../services/accesses'
import * as usersServices from '../services/users'
import * as schoolsServices from '../services/schools'

export const authorizeRequest = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let authorizationHeader: string = null
        if (_.has(req.headers, 'authorization')) {
            authorizationHeader = <string>_.get(req.headers, 'authorization')
        }

        // if (
        //     authorizationHeader.split(' ')[0] !== 'Bearer' ||
        //     !_.isString(authorizationHeader.split(' ')[1])
        // ) {
        //     throw authErrors.unknownAuthorizationHeader()
        // }

        const credentials: string = authorizationHeader.split(' ')[1]

        const { accessId, activeRole } = <TokenBody>jwt.verify(credentials, config.auth.jwtSecret)

        const access = await accessesServices.getAccessById(accessId, false, req.state)
        const user = await usersServices.getUserByAccessId(access._id, req.state)
        const school = await schoolsServices.getSchoolById(<string>user.school, false, req.state)

        req.state.activeRole = activeRole
        req.state.access = access
        req.state.user = user
        req.state.school = school

        return next()
    } catch (err) {
        req.state.logger.warn({ err }, 'Request Authorization Failed')
        return next(errors.unauthorized('Request Authorization Failed'))
    }
}

export const limitToRole = (requiredRole: UserRole|UserRole[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const activeRole = req.state.activeRole
        if (_.isArray(requiredRole) && requiredRole.indexOf(activeRole) >= 0) {
            next()
        } else if (activeRole === requiredRole) {
            next()
        }

        req.state.logger.warn({
            requiredRole, activeRole,
            access: _.pick(req.state.access, ['_id', 'username']),
            user: _.pick(req.state.user, ['_id', 'access', 'roles']),
        }, 'Request To Access Forbbiden Content')
    }

export const handleController =
    (controller: (req?: Request, res?: Response) => any, useStandardHandler: boolean = true) =>
        async (req: Request, res: Response, next: NextFunction) => {
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

function errorOutputSerializer(err: any): object {
    const data = _.get(err, 'body.data')
    if (_.isArray(data) && data.length > 0 && _.isObject(data[0])) {
        let messages = ''
        data.forEach(({ message }) => messages = `${messages} ${message}`)
        return { message: messages }
    }

    const serialized: any = _.pick(err, ['message', 'name'])
    if (_.has(err, 'httpStatus')) {
        serialized.status = _.get(err, 'httpStatus')
    }
    if (_.has(err, 'errorCode')) {
        serialized.code = _.get(err, 'errorCode')
    }
    if (config.params.sendErrorStackTrace) {
        serialized.stack = _.get(err, 'stack')
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
};

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