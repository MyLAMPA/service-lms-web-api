
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
} from '../types'
import {
    User,
} from '../types/identity'
import { usersRepository } from '../repositories'
import * as identityService from '../components/externalServices/identity'
import * as emailAddressesServices from './emailAddresses'

export async function getUserById(userId: number, state: State): Promise<User> {
    const user = await usersRepository.getUserById(userId, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getByUsername(username: string, state: State): Promise<User> {
    const user = await usersRepository.getUserByUsername(username, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getOrCreateUserByEmail(email: string, state: State): Promise<User> {
    const emailAddress = await emailAddressesServices.getOrCreateByEmail(email, state)
    if (emailAddress.userId && typeof emailAddress.userId === 'number') {
        const user = await getUserById(emailAddress.userId, state)
    }

    const user = await identityService.getOrCreateUserByEmail(email, state)
    if (user) {
        return user
    }
    throw errors.unprocessableEntityError('User Not Found Or Could Not Be Created')
}
