
import * as _ from 'lodash'

import {
    State,
} from '../types'
import * as subscriptionManagementApi from '../components/externalServices/subscriptionManagementApi'

export async function getSubscriptionsByUserId(userId: number, state: State) {
    const subscriptions = await subscriptionManagementApi.subscriptions.getSubscriptionsByUserId(userId, state)
    return subscriptions
}

export async function getSubscriptionsBySchoolId(schoolId: string, state: State) {
    const subscriptions = await subscriptionManagementApi.subscriptions.getSubscriptionsBySchoolId(schoolId, state)
    return subscriptions
}

export async function getSubscriptionId(subscriptionId: string, state: State) {
    const subscription = await subscriptionManagementApi.subscriptions.getSubscriptionById(subscriptionId, state)
    return subscription
}
