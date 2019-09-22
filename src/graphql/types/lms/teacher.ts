
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'

export const Model = new GraphQLObjectType({
    name: 'Teacher',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        fullName: {
            type: GraphQLString,
        },
        // email: {
        //     type: GraphQLString,
        // },
        abbr: {
            type: GraphQLString,
        },
        color: {
            type: GraphQLString,
        },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'CreateTeacher',
    fields: {
        email: {
            type: GraphQLString,
        },
        fullName: {
            type: new GraphQLNonNull(GraphQLString),
        },
        abbr: {
            type: GraphQLString,
        },
        color: {
            type: GraphQLString,
        },
    },
})
