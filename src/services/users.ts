
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
} from '../types'
import * as identityApi from '../components/externalServices/identity'

export async function getUserById(userId: number, state: State) {
    const user = await identityApi.users.getUserById(userId, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getOrCreateUserByEmail(email: string, state: State) {
    const user = await identityApi.users.getOrCreateUserByEmail(email, state)
    if (user) {
        return user
    }
    throw errors.unprocessableEntityError('User Not Found Or Could Not Be Created')
}
