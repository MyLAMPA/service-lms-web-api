
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    ContextMembershipRole,
} from '../../../types'
import { Model as SubscriptionModel } from '../../types/subscription'
import * as subscriptionsServices from '../../../services/subscriptions'

export const subscriptions = {
    type: new GraphQLList(SubscriptionModel),
    args: {},
    async resolve({ contextId, role }: LMSCtx, {}, { state }: Request) {
        let subscriptions = []

        if (role === ContextMembershipRole.admin) {
            subscriptions = await subscriptionsServices.getSubscriptionsBySchoolId(contextId, state)
        }

        return subscriptions
    },
}
