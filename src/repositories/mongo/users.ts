
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
} from '../../types'
import {
    User,
} from '../../types/identity'
import { source } from './source'
import { userSchema, UserName } from './schemas/user'

const usersCollection = source.collection<User>(
    UserName,
    userSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}users`
)

export async function getUserById(userId: string, state: State): Promise<User> {
    const user = await usersCollection.findById(userId)
    if (!_.isEmpty(user)) {
        return user
    }
    return null
}

export async function getUserByEmail(email: string, state: State): Promise<User> {
    const user = await usersCollection.findOne({ email })
    if (!_.isEmpty(user)) {
        return user
    }
    return null
}

export async function getUserByUsername(username: string, state: State): Promise<User> {
    const user = await usersCollection.findOne({ username })
    if (!_.isEmpty(user)) {
        return user
    }
    return null
}

export async function getUserByAccessId(accessId: string, state: State): Promise<User> {
    const user = await usersCollection.findOne({ access: accessId })
    if (!_.isEmpty(user)) {
        return user
    }
    return null
}

export async function getUsers(params: object, state: State): Promise<User[]> {
    const users = await usersCollection.find(params)
    return users
        .filter(user => !_.isEmpty(user))
        .map(user => <User>user)
}

export async function createUser(document: User, state: State): Promise<User> {
    const createdUser = await usersCollection.create(document)
    return createdUser
}
