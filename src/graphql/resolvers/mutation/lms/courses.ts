
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import {
    LMSCtx,
    LmsContextMembershipRole,
} from '../../../../types'
import {
    Model as CourseModel,
    CreateModel as CreateCourseModel,
} from '../../../types/lms/course'
import * as coursesServices from '../../../../services/lms/courses'

export const createCourse = {
    type: CourseModel,
    args: {
        course: {
            type: new GraphQLNonNull(CreateCourseModel),
        },
    },
    async resolve({ role }: LMSCtx, { course }, { state }: Request) {
        switch (role) {
            case LmsContextMembershipRole.admin:
            case LmsContextMembershipRole.freelancer:
                const createdCourse = await coursesServices.createCourse(course, state)
                return createdCourse
        }

        throw httpErrors.unauthorized('Unauthorized To Create Course')
    },
}
