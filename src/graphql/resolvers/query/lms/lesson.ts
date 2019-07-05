
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    LMSCtx,
    LMSContextMembershipRole,
} from '../../../../types'
import { Model as LessonModel } from '../../../types/lms/lesson'
import * as lessonsServices from '../../../../services/lms/lessons'

export const lesson = {
    type: LessonModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        if (!_.isNil(id)) {
            const lesson = await lessonsServices.getLessonById(id, state)
            return lesson
        }
        return null
    },
}

export const lessons = {
    type: new GraphQLList(LessonModel),
    args: {
        dateFrom: {
            type: GraphQLString,
        },
        dateTo: {
            type: GraphQLString,
        },
    },
    async resolve({ role, teacherId, studentId, contextId: context }: LMSCtx, { dateFrom, dateTo }, { state }: Request) {
        const searchParams: any = { context }

        switch (role) {
            case LMSContextMembershipRole.teacher:
                searchParams.teachers = { $in: [teacherId] }
                break
            case LMSContextMembershipRole.student:
                searchParams.students = { $in: [studentId] }
                break
        }

        if (!_.isNil(dateFrom)) {
            searchParams.end = { $gte: moment(dateFrom).toDate() }
        }
        if (!_.isNil(dateTo)) {
            searchParams.start = { $lt: moment(dateTo).toDate() }
        }

        const lessons = await lessonsServices.getLessons(searchParams, state)
        return lessons
    },
}
