
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    SchoolMembershipRole,
} from '../../../types/user'
import {
    LMSCtx,
} from '../../../types/lms'
import { Course } from '../../types'
import * as coursesServices from '../../../services/lms/courses'

export const course = {
    type: Course.Model,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(lmsCtx: LMSCtx, { id }, { state }: Request) {
        if (!_.isNil(id)) {
            switch (lmsCtx.role) {
                case SchoolMembershipRole.admin:
                case SchoolMembershipRole.teacher:
                    const course = await coursesServices.getCourseById(id, state)
                    return course
            }
        }
        return null
    },
}

export const courses = {
    type: new GraphQLList(Course.Model),
    args: {},
    async resolve(lmsCtx: LMSCtx, {}, { state }: Request) {
        const searchParams: any = {
            school: lmsCtx.schoolId,
        }

        if (lmsCtx.role === SchoolMembershipRole.student) {
            return []
        }

        const courses = await coursesServices.getCourses(searchParams, state)
        return courses
    },
}
