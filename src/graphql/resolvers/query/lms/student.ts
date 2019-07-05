
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    LMSContextMembershipRole,
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
            case LMSContextMembershipRole.admin:
            case LMSContextMembershipRole.teacher:
            case LMSContextMembershipRole.student:
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
            case LMSContextMembershipRole.teacher:
            case LMSContextMembershipRole.student:
                return []
        }

        const students = await studentsServices.getStudents(searchParams, state)
        return students
    },
}
