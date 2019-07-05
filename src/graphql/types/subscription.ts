
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { SubscriptionStatusEnum } from './enums'
import { Model as StripeSubscriptionModel } from './stripeSubscription'
import { Model as ProductModel } from './product'
import * as userSubscriptionsServices from '../../services/subscriptions/userSubscriptions'

export const Model = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: subscription => _.isNil(subscription.id) ? null : subscription.id,
        },
        skuId: {
            type: GraphQLString,
        },
        stripeSubscriptionId: {
            type: GraphQLString,
        },
        stripePricingPlanId: {
            type: GraphQLString,
        },
        status: {
            type: SubscriptionStatusEnum,
        },
        userId: {
            type: GraphQLInt,
        },
        lmsContextId: {
            type: GraphQLString,
        },
        stripeSubscription: {
            type: StripeSubscriptionModel,
        },
        product: {
            type: ProductModel,
            resolve: async({ skuId }, {}, { state }: Request) => {
                if (skuId) {
                    const product = await userSubscriptionsServices.getProductBySkuId(skuId, state)
                    return product
                }
                return null
            },
        },
    },
})
