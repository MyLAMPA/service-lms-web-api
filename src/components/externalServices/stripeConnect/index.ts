
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors } from '../../../errors'
import {
    State,
} from '../../../types'
import { Card } from './index.d'
import { source } from './source'

export const getUserSource = async(userId: number, state: State): Promise<Card> => {
    const response = await source.httpGet<Card>(`/users/${userId}/source`, {})
    if (_.isEmpty(response)) {
        return null
    }
    return response
}

export const updateUserSource = async(userId: number, stripeTokenId: string, state: State): Promise<Card> => {
    const response = await source.httpPost<Card>(`/users/${userId}/source`, { stripeTokenId })
    if (_.isEmpty(response)) {
        return null
    }
    return response
}
