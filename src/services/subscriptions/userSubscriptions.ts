
import * as _ from 'lodash'

import { errorCodes } from '../../errors/errorCodes'
import {
    State,
} from '../../types'
import * as subscriptionsService from '../../components/externalServices/subscriptionsService'

export const getPricingPlans = async(skuId: string, state: State) =>
    await subscriptionsService.getPricingPlans(skuId, state)

export const getProductBySkuId = async(skuId: string, state: State) =>
    await subscriptionsService.getProductBySkuId(skuId, state)

export const getProductByName = async(name: string, state: State) =>
    await subscriptionsService.getProductByName(name, state)

export const getUserSubscriptions = async(userId: number, state: State) =>
    await subscriptionsService.getUserSubscriptions(userId, state)

export const createUserSubscription = async(userId: number, skuId: string, pricingPlanId: string, state: State) =>
    await subscriptionsService.createUserSubscription(userId, skuId, pricingPlanId, state)
