
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

export const Model = new GraphQLObjectType({
    name: 'SchoolYear',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        title: {
            type: GraphQLString,
        },
        start: {
            type: GraphQLString,
            resolve: ({ start }) => !_.isNil(start) ?
                moment(start).toISOString() : null,
        },
        end: {
            type: GraphQLString,
            resolve: ({ end }) => !_.isNil(end) ?
                moment(end).toISOString() : null,
        },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'CreateSchoolYear',
    fields: {
        title: {
            type: GraphQLString,
        },
        start: {
            type: new GraphQLNonNull(GraphQLString),
        },
        end: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
})
