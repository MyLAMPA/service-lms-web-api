
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    LMSCtx,
} from '../../../types/lms'
import {
    SchoolMembershipRole,
} from '../../../types/user'
import { Lesson } from '../../types'
import * as lessonsServices from '../../../services/lessons'

export const lesson = {
    type: Lesson.Model,
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
    type: new GraphQLList(Lesson.Model),
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

        const lessons = await lessonsServices.getLessons(searchParams, true, true, true, true, true, state)
        return lessons
    },
}
