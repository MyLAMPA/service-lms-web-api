
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../types'
import { Model as SubscriptionModel } from '../../types/subscription'
import * as subscriptionsServices from '../../../services/subscriptions'

export const mySubscriptions = {
    type: new GraphQLList(SubscriptionModel),
    args: {},
    async resolve({ userId }: IDCtx, {}, { state }: Request) {
        const subscriptions = await subscriptionsServices.getSubscriptionsByUserId(userId, state)
        return subscriptions
    },
}
