
import * as _ from 'lodash'
import * as moment from 'moment'
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { Model as DocumentModel, CreateModel as DocumentCreateModel } from '../document'
import { Model as TagModel, CreateModel as TagCreateModel } from './tag'

export const Model = new GraphQLObjectType({
    name: 'Library_Activity',
    fields: {
        id: {
            type: GraphQLString,
            resolve: activity => _.isNil(activity._id) ? null : String(activity._id),
        },
        createdAt: {
            type: GraphQLString,
            resolve: ({ createdAt }) => _.isNil(createdAt) ? null : moment(createdAt).toISOString(),
        },
        createdBy: {
            type: GraphQLInt,
        },
        title: {
            type: GraphQLString,
        },
        procedure: {
            type: GraphQLString, // DocumentModel,
        },
        isRepeatable: {
            type: GraphQLBoolean,
        },
        tags: {
            type: new GraphQLList(TagModel),
        },
    },
})

export const CreateModel = new GraphQLInputObjectType({
    name: 'Library_Activity_Create',
    fields: {
        title: {
            type: GraphQLString,
        },
        procedure: {
            type: GraphQLString, // DocumentCreateModel,
        },
        tags: {
            type: new GraphQLList(TagCreateModel),
        },
        isRepeatable: {
            type: GraphQLBoolean,
        },
        privacyPolicy: {
            type: new GraphQLInputObjectType({
                name: 'Library_Activity_Create_privacyPolicy',
                fields: {
                    isPublic: {
                        type: GraphQLBoolean,
                    },
                },
            }),
        },
    },
})
