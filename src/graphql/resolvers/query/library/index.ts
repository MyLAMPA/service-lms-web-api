
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { lessonPlan, lessonPlans } from './lessonPlan'
import { activity, searchMyActivities, searchActivities } from './activity'

export const library = {
    type: new GraphQLObjectType({
        name: 'Library_Context',
        fields: {
            lessonPlan, lessonPlans,
            activity, searchMyActivities, searchActivities,
        },
    }),
    args: {},
    resolve(source, {}, { state }: Request) {
        return state.idCtx
    },
}
