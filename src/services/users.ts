
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import * as db from '../repositories/mongo'
import {
    State,
    User,
    Partial,
} from '../models'
import * as accessesServices from './accesses'

export async function isEmailInUse(email: string, state: State): Promise<boolean> {
    const user = await db.users.findOne({ email })
    return !_.isNil(user)
}

export async function getUsers(params: object, state: State): Promise<User[]> {
    const users = await db.users.find(params).lean()
    return users
}

export async function getUsersInViewOnlyFormat(params: object, state: State): Promise<Partial<User>[]> {
    const users = await db.users.find(params).select('_id name').lean()
    return users
}

export async function getUserById(userId: string, state: State): Promise<User> {
    const user = await db.users.findById(userId).lean()
    if (!_.isNil(user)) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getUserInViewOnlyFormatById(userId: string, state: State): Promise<Partial<User>> {
    const user = await db.users.findById(userId).select('_id name').lean()
    if (!_.isNil(user)) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getUserByUsername(username: string, state: State): Promise<User> {
    const user = await db.users.findOne({ username }).lean()
    if (!_.isNil(user)) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function getUserByEmail(email: string, state: State): Promise<User> {
    const user = await db.users.findOne({ email }).lean()
    if (!_.isNil(user)) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function createUser(user: Partial<User>, state: State): Promise<User> {
    const _user = await db.users.create(user)
    return _user.toObject()
}

export async function getUserByAccessId(accessId: string, state: State): Promise<User> {
    const user = await db.users.findOne({ access: accessId }).lean()
    if (!_.isNil(user)) {
        return user
    }
    throw errors.notFound('User Not Found')
}

export async function updateUserById(userId: string, user: Partial<User>, state: State): Promise<any> {
    await db.users.findByIdAndUpdate(userId, { $set: user })
    return getUserById(userId, state)
}
