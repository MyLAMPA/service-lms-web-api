
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../../types'
import {
    Model as SubscriptionModel,
} from '../../../types/subscription'
import * as userSubscriptionsServices from '../../../../services/subscriptions/userSubscriptions'

export const subscriptions = {
    type: new GraphQLList(SubscriptionModel),
    args: {},
    async resolve({ userId }: IDCtx, {}, { state }: Request) {
        const subscriptions = await userSubscriptionsServices.getUserSubscriptions(userId, state)
        return subscriptions
    },
}
