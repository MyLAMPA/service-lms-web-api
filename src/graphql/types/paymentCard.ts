
import * as _ from 'lodash'
import * as moment from 'moment'
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

export const Model = new GraphQLObjectType({
    name: 'PaymentCard',
    fields: {
        brand: {
            type: GraphQLString,
        },
        last4digits: {
            type: GraphQLString,
            resolve: card => _.get(card, 'last4') ? _.get(card, 'last4') : null,
        },
        expirationMonth: {
            type: GraphQLString,
            resolve: card => _.get(card, 'exp_month') ? _.get(card, 'exp_month') : null,
        },
        expirationYear: {
            type: GraphQLString,
            resolve: card => _.get(card, 'exp_year') ? _.get(card, 'exp_year') : null,
        },
        country: {
            type: GraphQLString,
        },
    },
})
