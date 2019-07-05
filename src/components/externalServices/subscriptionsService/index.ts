
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors } from '../../../errors'
import {
    State,
} from '../../../types'
import {
    PricingPlan,
    Product,
    Subscription,
} from './index.d'
import { source } from './source'

export const getPricingPlans = async(skuId: string, state: State): Promise<PricingPlan[]> => {
    const response = await source.httpGet<PricingPlan[]>('/pricingPlans', { skuId })
    return response
}

export const getProductBySkuId = async(skuId: string, state: State): Promise<Product> => {
    const response = await source.httpGet<Product[]>('/products', { skuId })
    if (!_.isEmpty(response) && !_.isEmpty(response[0])) {
        return response[0]
    }
    return null
}

export const getProductByName = async(name: string, state: State): Promise<Product> => {
    const response = await source.httpGet<Product[]>('/products', { name })
    if (!_.isEmpty(response) && !_.isEmpty(response[0])) {
        return response[0]
    }
    return null
}

export const getUserSubscriptions = async(userId: number, state: State): Promise<Subscription[]> => {
    const response = await source.httpGet<Subscription[]>(`/users/${userId}/subscriptions`, {})
    return response
}

export const createUserSubscription = async(
    userId: number,
    skuId: string,
    pricingPlanId: string,
    state: State
): Promise<Subscription> => {
    const response = await source.httpGet<Subscription>(`/users/${userId}/subscriptions`, { skuId, pricingPlanId })
    return response
}
