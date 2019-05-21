
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
// import * as usersServices from '../../../services/users'

export const lessonPlan = {
    type: LessonPlanModel,
    args: {},
    async resolve({}: IDCtx, {}, { state }: Request) {
        // const user = await usersServices.getUserById(userId, state)
        return null
    },
}

export const lessonPlans = {
    type: new GraphQLList(LessonPlanModel),
    args: {},
    async resolve({}: IDCtx, {}, { state }: Request) {
        // const user = await usersServices.getUserById(userId, state)
        return []
    },
}
