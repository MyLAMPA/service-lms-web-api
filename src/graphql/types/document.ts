
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
    name: 'Document',
    fields: {
        json: {
            type: GraphQLString,
        },
        html: {
            type: GraphQLString,
        },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'Document_Create',
    fields: {
        json: {
            type: GraphQLString,
        },
    },
})

export const UpdateModel = new GraphQLInputObjectType({
    name: 'Document_Update',
    fields: {
        json: {
            type: GraphQLString,
        },
    },
})
