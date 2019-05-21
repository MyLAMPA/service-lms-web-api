
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
    name: 'Library_LessonPlan',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: lessonPlan => _.isNil(lessonPlan.id) ? null : lessonPlan.id,
        },
    },
})
