
import * as _ from 'lodash'

import {
    State,
    UserSubscriptionsCtx,
} from '../../types'
import * as userSubscriptionsServices from './userSubscriptions'

export const loadUserSubscriptionsContext = async(state: State): Promise<void> => {
    const activeSubscriptionProducts = []

    const { userId } = state.idCtx
    const userSubscriptions = await userSubscriptionsServices.getUserSubscriptions(userId, state)
    for (const i in userSubscriptions) {
        const product = await userSubscriptionsServices.getProductBySkuId(userSubscriptions[i].skuId, state)
        activeSubscriptionProducts.push(product)
    }

    state.userSubscriptionsCtx = { activeSubscriptionProducts }
}

export const getUserSubscriptionsContext = async(state: State): Promise<UserSubscriptionsCtx> => {
    if (_.isEmpty(state.userSubscriptionsCtx)) {
        await loadUserSubscriptionsContext(state)
    }

    return state.userSubscriptionsCtx
}
