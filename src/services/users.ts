
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    User,
    Partial,
} from '../models'

export async function isEmailInUse(email: string, state: State): Promise<boolean> {
    throw errors.serverError('deprached api')
}

export async function getUsers(params: object, state: State): Promise<User[]> {
    throw errors.serverError('deprached api')
}

export async function getUsersInViewOnlyFormat(params: object, state: State): Promise<Partial<User>[]> {
    throw errors.serverError('deprached api')
}

export async function getUserById(userId: string, state: State): Promise<User> {
    throw errors.serverError('deprached api')
}

export async function getUserInViewOnlyFormatById(userId: string, state: State): Promise<Partial<User>> {
    throw errors.serverError('deprached api')
}

export async function getUserByUsername(username: string, state: State): Promise<User> {
    throw errors.serverError('deprached api')
}

export async function getUserByEmail(email: string, state: State): Promise<User> {
    throw errors.serverError('deprached api')
}

export async function createUser(user: Partial<User>, state: State): Promise<User> {
    throw errors.serverError('deprached api')
}

export async function getUserByAccessId(accessId: string, state: State): Promise<User> {
    throw errors.serverError('deprached api')
}

export async function updateUserById(userId: string, user: Partial<User>, state: State): Promise<any> {
    throw errors.serverError('deprached api')
}
