
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    ContextMembershipRole,
} from '../../../types'
import { Model as CourseModel } from '../../types/lms/course'
import * as coursesServices from '../../../services/courses'

export const course = {
    type: CourseModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        if (!_.isNil(id)) {
            switch (role) {
                case ContextMembershipRole.admin:
                case ContextMembershipRole.teacher:
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
    async resolve({ role, contextId: context }: LMSCtx, {}, { state }: Request) {
        const searchParams: any = { context }

        if (role === ContextMembershipRole.student) {
            return []
        }

        const courses = await coursesServices.getCourses(searchParams, state)
        return courses
    },
}
