
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
    name: 'StripePlan',
    fields: {
        id: {
            type: GraphQLString,
        },
        active: {
            type: GraphQLBoolean,
        },
        amount: {
            type: GraphQLInt,
        },
        billing_scheme: {
            type: GraphQLString,
        },
        created: {
            type: GraphQLInt,
        },
        currency: {
            type: GraphQLString,
        },
        interval: {
            type: GraphQLString,
        },
        interval_count: {
            type: GraphQLInt,
        },
        nickname: {
            type: GraphQLString,
        },
        product: {
            type: GraphQLString,
        },
        usage_type: {
            type: GraphQLString,
        },
    },
})
