
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

import { Model as StripePlanModel } from './stripePlan'

export const Model = new GraphQLObjectType({
    name: 'StripeSubscription',
    fields: {
        id: {
            type: GraphQLString,
        },
        status: {
            type: GraphQLString,
        },
        billing_cycle_anchor: {
            type: GraphQLInt,
        },
        created: {
            type: GraphQLInt,
        },
        current_period_end: {
            type: GraphQLInt,
        },
        current_period_start: {
            type: GraphQLInt,
        },
        customer: {
            type: GraphQLString,
        },
        plan: {
            type: StripePlanModel,
        },
    },
})
