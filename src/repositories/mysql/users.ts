
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    Partial,
    State,
} from '../../types'
import {
    User,
} from '../../types/identity'
import { SQLQuery } from './source'

const tableName: string = 'users'

const userReadFields = [
    'id', 'username',
    'primaryEmailAddress',
    'firstName', 'lastName',
    'birthDate', 'sex',
    'profileImage',
]

export async function getUserById(userId: number, state: State): Promise<User> {
    const query = new SQLQuery<User[]>(`
        SELECT  ${userReadFields.join(', ')}
        FROM    ${tableName}
        WHERE   id = ${userId}
        LIMIT   1
    `)

    const results = await query.execute()

    if (!_.isEmpty(results) && !_.isEmpty(results[0])) {
        const { birthDate, ...item }: User = <User>_.pick(results[0], userReadFields)
        return {
            birthDate: typeof birthDate === 'number' ? moment(birthDate * 1000).utc().toDate() : null,
            ...item,
        }
    }

    return null
}

export async function getUserByUsername(username: string, state: State): Promise<User> {
    const query = new SQLQuery<User[]>(`
        SELECT  ${userReadFields.join(', ')}
        FROM    ${tableName}
        WHERE   username = "${username}"
        LIMIT   1
    `)

    const results = await query.execute()

    if (!_.isEmpty(results) && !_.isEmpty(results[0])) {
        const { birthDate, ...item }: User = <User>_.pick(results[0], userReadFields)
        return {
            birthDate: typeof birthDate === 'number' ? moment(birthDate * 1000).utc().toDate() : null,
            ...item,
        }
    }

    return null
}

export async function updateUser(userId: number, user: Partial<User>, state: State): Promise<void> {
    const _user = _.merge(
        {},
        {
            credentials: null,
            username: null,
            primaryEmailAddress: null,
            firstName: null,
            lastName: null,
            fullName: null,
            birthDate: null,
            sex: null,
        },
        _.pick(user, ['credentials', 'username', 'primaryEmailAddress', 'firstName', 'lastName', 'fullName', 'birthDate', 'sex', 'profileImage'])
    )

    const change: { field: string; value: string; }[] = []
    if (typeof _user.credentials === 'number') {
        change.push({ field: 'credentials', value: String(_user.credentials) })
    }
    if (typeof _user.username === 'string') {
        change.push({ field: 'username', value: `"${_user.username}"` })
    }
    if (typeof _user.primaryEmailAddress === 'string') {
        change.push({ field: 'primaryEmailAddress', value: `"${_user.primaryEmailAddress}"` })
    }
    if (typeof _user.firstName === 'string') {
        change.push({ field: 'firstName', value: `"${_user.firstName}"` })
    }
    if (typeof _user.lastName === 'string') {
        change.push({ field: 'lastName', value: `"${_user.lastName}"` })
    }
    if (!_.isNil(_user.birthDate)) {
        change.push({ field: 'birthDate', value: String(moment(_user.birthDate).unix()) })
    }
    if (typeof _user.sex === 'string') {
        change.push({ field: 'sex', value: `"${_user.sex}"` })
    }
    if (typeof _user.profileImage === 'string') {
        change.push({ field: 'profileImage', value: `"${_user.profileImage}"` })
    }

    const query = new SQLQuery<{ insertId: number }>(`
        UPDATE
            ${tableName}
        SET
            ${change.map(({ field, value }) => `${field}=${value}`).join(', ')}
        WHERE
            id = ${userId}
    `)

    const results = await query.execute()
    return
}
