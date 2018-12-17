
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
} from '../../../types/lms'
import {
    SchoolMembershipRole,
} from '../../../types/user'
import { Teacher } from '../../types'
import * as teachersServices from '../../../services/lms/teachers'

export const teacher = {
    type: Teacher.Model,
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
            const teacher = await teachersServices.getTeacherById(id, state)
            return teacher
        }
        return null
    },
}

export const teachers = {
    type: new GraphQLList(Teacher.Model),
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

        const teachers = await teachersServices.getTeachers(searchParams, state)
        return teachers
    },
}
