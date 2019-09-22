
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
    GraphQLNonNull,
} from 'graphql'

import {
    CEFLevelEnum,
    ActivitySkillEnum,
} from '../enums'
import { edges } from '../edges'
import {
    Model as DocumentModel,
    CreateModel as DocumentCreateModel,
    UpdateModel as DocumentUpdateModel,
} from '../document'
import {
    Model as TagModel,
    CreateModel as TagCreateModel,
} from '../tag'

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
        slug: {
            type: GraphQLString,
        },
        title: {
            type: GraphQLString,
        },
        description: {
            type: GraphQLString,
        },
        procedure: {
            type: DocumentModel,
        },
        duration: {
            type: GraphQLInt,
        },
        isRepeatable: {
            type: GraphQLBoolean,
        },
        level: {
            type: new GraphQLList(CEFLevelEnum),
        },
        skill: {
            type: new GraphQLList(ActivitySkillEnum),
        },
        type: {
            type: new GraphQLList(GraphQLString),
        },
        topic: {
            type: new GraphQLList(GraphQLString),
        },

        tags: {
            type: new GraphQLList(TagModel),
        },
    },
})

export const Edges = edges(Model)

export const CreateModel = new GraphQLInputObjectType({
    name: 'Library_CreateActivity',
    fields: {
        title: {
            type: new GraphQLNonNull(GraphQLString),
        },
        description: {
            type: GraphQLString,
        },
        procedure: {
            type: DocumentCreateModel,
        },
        duration: {
            type: GraphQLInt,
        },
        isRepeatable: {
            type: GraphQLBoolean,
        },
        level: {
            type: new GraphQLList(CEFLevelEnum),
        },
        skill: {
            type: new GraphQLList(ActivitySkillEnum),
        },
        type: {
            type: new GraphQLList(GraphQLString),
        },
        topic: {
            type: new GraphQLList(GraphQLString),
        },
        tags: {
            type: new GraphQLList(TagCreateModel),
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

export const UpdateModel = new GraphQLInputObjectType({
    name: 'Library_Activity_Update',
    fields: {
        title: {
            type: GraphQLString,
        },
        procedure: {
            type: DocumentUpdateModel,
        },
        duration: {
            type: GraphQLInt,
        },
        isRepeatable: {
            type: GraphQLBoolean,
        },
    },
})
