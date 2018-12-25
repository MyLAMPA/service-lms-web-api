
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

export const Model = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: subscription => _.isNil(subscription.id) ? null : subscription.id,
        },
        status: {
            type: SubscriptionStatusEnum,
        },
        originalPurchaseDate: {
            type: GraphQLString,
        },
        purchaseDate: {
            type: GraphQLString,
        },
        expirationDate: {
            type: GraphQLString,
        },
    },
})
