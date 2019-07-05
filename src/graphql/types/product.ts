
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

export const Model = new GraphQLObjectType({
    name: 'Product',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: subscription => _.isNil(subscription.id) ? null : subscription.id,
        },
        skuId: {
            type: GraphQLString,
        },
        stripeProductId: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        title: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        isUserEligible: {
            type: GraphQLBoolean,
        },
        isSchoolEligible: {
            type: GraphQLBoolean,
        },
    },
})
