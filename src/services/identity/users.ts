
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../types'
import {
    User,
} from '../../types/identity'
import { usersRepository } from '../../repositories'

export async function getOrCreateUserByEmail(email: string, state: State): Promise<User> {
    const user = await usersRepository.getUserById(email, state)
    if (user) {
        return user
    }

    const createdUser = await usersRepository.createUser({
        email,
        access: null, firstName: null, lastName: null,
    }, state)
    return createdUser
}

export async function isEmailInUse(email: string, state: State): Promise<boolean> {
    const user = await usersRepository.getUserByEmail(email, state)
    if (user) {
        return true
    }
    return false
}

export async function getUserById(userId: string, state: State): Promise<User> {
    const user = await usersRepository.getUserById(userId, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getUserByUsername(username: string, state: State): Promise<User> {
    const user = await usersRepository.getUserByUsername(username, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getUserByEmail(email: string, state: State): Promise<User> {
    const user = await usersRepository.getUserByEmail(email, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

// export async function createUser(user: Partial<User>, state: State): Promise<User> {
//     const _user = await db.users.create(user)
//     return _user.toObject()
// }

export async function getUserByAccessId(accessId: string, state: State): Promise<User> {
    const user = await usersRepository.getUserByAccessId(accessId, state)
    if (user) {
        return user
    }
    throw errors.notFound('User Not Found')
}

// export async function updateUserById(userId: string, user: Partial<User>, state: State): Promise<any> {
//     await db.users.findByIdAndUpdate(userId, { $set: user })
//     return getUserById(userId, state)
// }
