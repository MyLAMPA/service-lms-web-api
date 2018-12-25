
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
    name: 'User',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: user => _.isNil(user.id) ? null : user.id,
        },
        email: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        fullName: {
            type: GraphQLString,
            async resolve(user) {
                return `${user.firstName} ${user.lastName}`
            },
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
    },
})
