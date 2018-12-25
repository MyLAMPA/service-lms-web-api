
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    LMSCtx,
    SchoolMembershipRole,
} from '../../../types'
import { Model as LessonModel } from '../../types/lms/lesson'
import * as lessonsServices from '../../../services/lessons'

export const lesson = {
    type: LessonModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(lmsCtx: LMSCtx, { id }, { state }: Request) {
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
    async resolve(lmsCtx: LMSCtx, { dateFrom, dateTo }, { state }: Request) {
        const searchParams: any = {
            school: lmsCtx.schoolId,
        }

        switch (lmsCtx.role) {
            case SchoolMembershipRole.teacher:
                searchParams.teachers = { $in: [lmsCtx.teacherId] }
                break
            case SchoolMembershipRole.student:
                searchParams.students = { $in: [lmsCtx.studentId] }
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
