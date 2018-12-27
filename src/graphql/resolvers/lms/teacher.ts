
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
import { Model as TeacherModel } from '../../types/lms/teacher'
import * as teachersServices from '../../../services/teachers'

export const teacher = {
    type: TeacherModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        switch (role) {
            case ContextMembershipRole.admin:
            case ContextMembershipRole.teacher:
            case ContextMembershipRole.student:
        }

        if (!_.isNil(id)) {
            const teacher = await teachersServices.getTeacherById(id, state)
            return teacher
        }
        return null
    },
}

export const teachers = {
    type: new GraphQLList(TeacherModel),
    args: {},
    async resolve({ role, contextId: context }: LMSCtx, {}, { state }: Request) {
        const searchParams: any = { context }

        switch (role) {
            case ContextMembershipRole.teacher:
            case ContextMembershipRole.student:
                return []
        }

        const teachers = await teachersServices.getTeachers(searchParams, state)
        return teachers
    },
}
