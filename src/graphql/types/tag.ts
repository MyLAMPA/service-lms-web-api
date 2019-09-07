
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
    name: 'Tag',
    fields: {
        key: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        text: {
            type: GraphQLString,
        },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'Tag_Create',
    fields: {
        key: {
            type: new GraphQLNonNull(GraphQLString),
        },
        name: {
            type: GraphQLString,
        },
        text: {
            type: GraphQLString,
        },
    },
})
