
import { v4 as uuidv4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt-nodejs'
import * as _ from 'lodash'

import { config } from '../../config'
import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../types'
import {
    IDCtx,
    Access,
    User,
    Credentials,
} from '../../types/identity'
import * as accessesServices from './accesses'
import * as usersServices from './users'

export async function hashPassword(plainPassword: string, state: State): Promise<string> {
    return bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(config.auth.hashSaltRounds))
}

export async function issueBearerToken(accessId: string, userId: string, state: State): Promise<string> {
    const token: IDCtx = { accessId, userId }
    return jwt.sign(token, config.auth.jwtSecret, {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
    })
}

export async function loginUsingCredentials(credentials: Credentials, state: State): Promise<{ bearerToken: string }> {
    let user: User = null
    let access: Access = null

    try {
        if (!_.isString(credentials.email)) {
            throw errors.unauthorized('Empty Email')
        }

        user = await usersServices.getUserByEmail(credentials.email, state)
        access = await accessesServices.getAccessByIdWithPassword(user.access as string, state)
    } catch (err) {
        try {
            if (!_.isString(credentials.username)) {
                throw errors.unauthorized('Empty Username')
            }

            access = await accessesServices.getAccessByUsernameWithPassword(credentials.username, state)
            user = await usersServices.getUserByAccessId(access._id, state)
        } catch (err) {
            state.logger.info({ err }, 'Invalid Username')
            throw errors.unauthorized('Invalid Credentials')
        }
    }

    if (!access.isActive) {
        state.logger.info({ user, access: _.pick(access, ['_id', 'isActive', 'username']) }, 'Attempt to use inactive Access')
        throw errors.unauthorized('Access Is Not Active')
    }

    if (!bcrypt.compareSync(credentials.password, access.password)) {
        throw errors.unauthorized('Invalid Credentials')
    }

    const bearerToken = await issueBearerToken(access._id, user._id, state)

    return { bearerToken }
}
