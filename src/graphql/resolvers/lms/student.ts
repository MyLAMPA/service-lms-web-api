
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    SchoolMembershipRole,
} from '../../../types'
import { Model as StudentModel } from '../../types/lms/student'
import * as studentsServices from '../../../services/students'

export const student = {
    type: StudentModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(lmsCtx: LMSCtx, { id }, { state }: Request) {
        switch (lmsCtx.role) {
            case SchoolMembershipRole.admin:
            case SchoolMembershipRole.teacher:
            case SchoolMembershipRole.student:
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
    async resolve(lmsCtx: LMSCtx, {}, { state }: Request) {
        const searchParams: any = {
            school: lmsCtx.schoolId,
        }

        switch (lmsCtx.role) {
            case SchoolMembershipRole.teacher:
            case SchoolMembershipRole.student:
                return []
        }

        const students = await studentsServices.getStudents(searchParams, state)
        return students
    },
}
