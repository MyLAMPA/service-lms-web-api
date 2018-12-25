
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    State,
} from '../../../types'
import {
    User,
} from './index.d'
import { source } from './source'

export async function getUserById(userId: number, state: State): Promise<User> {
    const user = await source.httpGet<User>(`/api/users/${userId}`, {})
    if (!_.isEmpty(user)) {
        return user
    }
    return null
}

export async function getOrCreateUserByEmail(email: string, state: State): Promise<User> {
    const user = await source.httpPatch<User>(`/api/users`, { email })
    if (!_.isEmpty(user)) {
        return user
    }
    return null
}
