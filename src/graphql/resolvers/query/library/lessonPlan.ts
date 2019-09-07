
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../../types'
import { Model as LessonPlanModel } from '../../../types/library/lessonPlan'
import * as lessonPlansServices from '../../../../services/library/lessonPlans'

export const lessonPlan = {
    type: LessonPlanModel,
    args: {
        slug: {
            type: GraphQLString,
        },
    },
    async resolve({}: IDCtx, { slug }, { state }: Request) {
        if (slug) {
            const lessonPlan = await lessonPlansServices.getLessonPlanBySlugPopulated(slug, state)
            return lessonPlan
        }
        return null
    },
}

export const searchMyLessonPlans = {
    type: new GraphQLList(LessonPlanModel),
    args: {},
    async resolve({}: IDCtx, {}, { state }: Request) {
        // const user = await usersServices.getUserById(userId, state)
        return []
    },
}
