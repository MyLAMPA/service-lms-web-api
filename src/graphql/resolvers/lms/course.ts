
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    SchoolMembershipRole,
} from '../../../types/identity'
import {
    LMSCtx,
} from '../../../types/lms'
import { Model as CourseModel } from '../../types/lms/course'
import * as coursesServices from '../../../services/lms/courses'

export const course = {
    type: CourseModel,
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
    type: new GraphQLList(CourseModel),
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
