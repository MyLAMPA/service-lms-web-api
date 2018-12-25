
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    State,
} from '../../../types'
import {
    Subscription,
    SubscriptionStatus,
} from './index.d'
import { source } from './source'

export async function getSubscriptionsByUserId(userId: number, state: State): Promise<Subscription[]> {
    const subscriptions = await source.httpGet<Subscription[]>('/api/subscriptions', { userId })
    if (_.isArray(subscriptions)) {
        return subscriptions.filter(item => !_.isEmpty(item))
    }
    return []
}

export async function getSubscriptionsBySchoolId(schoolId: string, state: State): Promise<Subscription[]> {
    const subscriptions = await source.httpGet<Subscription[]>('/api/subscriptions', { schoolId })
    if (_.isArray(subscriptions)) {
        return subscriptions.filter(item => !_.isEmpty(item))
    }
    return []
}

export async function getSubscriptionById(subscriptionId: string, state: State): Promise<Subscription> {
    const subscription = await source.httpGet<Subscription>(`/api/subscriptions/${subscriptionId}`, {})
    if (!_.isEmpty(subscription)) {
        return subscription
    }
    return null
}
