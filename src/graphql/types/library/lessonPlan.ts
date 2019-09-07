
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

import { Model as TagModel } from '../tag'
import { Model as OutcomeModel } from './outcome'
import { Model as ActivityModel } from './activity'

export const Model = new GraphQLObjectType({
    name: 'Library_LessonPlan',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: lessonPlan => _.isNil(lessonPlan.id) ? null : lessonPlan.id,
        },
        createdAt: {
            type: GraphQLString,
        },
        createdBy: {
            type: GraphQLInt,
        },
        title: {
            type: GraphQLString,
        },
        slug: {
            type: GraphQLString,
        },
        tags: {
            type: new GraphQLList(TagModel),
        },
        outcomes: {
            type: new GraphQLList(OutcomeModel),
        },
        activities: {
            type: new GraphQLList(ActivityModel),
        },
    },
})
