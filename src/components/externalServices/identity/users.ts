
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../../errors'
import {
    State,
} from '../../../types'
import {
    User,
} from '../../../types/identity'
import { source } from './source'

export async function getUserById(userId: number, state: State): Promise<User> {
    try {
        const user = await source.httpGet<User>(`/api/users/${userId}`, {})
        if (!_.isEmpty(user)) {
            return user
        }
        return null
    } catch (err) {
        state.logger.error({ err }, 'IdentityService: Failed to fetch user by id')
        throw errors.badGateway('Request To Identity Service Failed')
    }
}

export async function getOrCreateUserByEmail(email: string, state: State): Promise<User> {
    try {
        const user = await source.httpPatch<User>(`/api/users`, { email })
        if (!_.isEmpty(user)) {
            return user
        }
        return null
    } catch (err) {
        state.logger.error({ err }, 'IdentityService: Failed to fetch or create user by email')
        throw errors.badGateway('Request To Identity Service Failed')
    }
}
