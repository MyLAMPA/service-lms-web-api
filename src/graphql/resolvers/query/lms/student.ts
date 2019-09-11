
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    LmsContextMembershipRole,
} from '../../../../types'
import { Model as StudentModel } from '../../../types/lms/student'
import * as studentsServices from '../../../../services/lms/students'

export const student = {
    type: StudentModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        switch (role) {
            case LmsContextMembershipRole.freelancer:
            case LmsContextMembershipRole.admin:
            case LmsContextMembershipRole.teacher:
            case LmsContextMembershipRole.student:
        }

        if (!_.isNil(id)) {
            const student = await studentsServices.getStudentById(id, state)
            return student
        }
        return null
    },
}

export const students = {
    type: new GraphQLList(StudentModel),
    args: {},
    async resolve({ role, contextId: context }: LMSCtx, {}, { state }: Request) {
        const searchParams: any = { context }

        switch (role) {
            case LmsContextMembershipRole.teacher:
            case LmsContextMembershipRole.student:
                return []
        }

        const students = await studentsServices.getStudents(searchParams, state)
        return students
    },
}
