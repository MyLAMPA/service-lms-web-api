
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
    name: 'Course',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        name: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        color: {
            type: GraphQLString,
        },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'CreateCourse',
    fields: {
        name: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
    },
})
