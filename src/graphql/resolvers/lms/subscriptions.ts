
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    SchoolMembershipRole,
} from '../../../types'
import { Model as SubscriptionModel } from '../../types/subscription'
import * as subscriptionsServices from '../../../services/subscriptions'

export const subscriptions = {
    type: new GraphQLList(SubscriptionModel),
    args: {},
    async resolve({ role, schoolId }: LMSCtx, {}, { state }: Request) {
        let subscriptions = []

        if (role === SchoolMembershipRole.admin) {
            subscriptions = await subscriptionsServices.getSubscriptionsBySchoolId(schoolId, state)
        }

        return subscriptions
    },
}
