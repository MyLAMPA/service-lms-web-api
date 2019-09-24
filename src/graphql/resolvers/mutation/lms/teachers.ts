
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
    Model as TeacherModel,
    CreateModel as CreateTeacherModel,
} from '../../../types/lms/teacher'
import * as teachersServices from '../../../../services/lms/teachers'

export const createTeachers = {
    type: new GraphQLList(TeacherModel),
    args: {
        teachers: {
            type: new GraphQLNonNull(new GraphQLList(CreateTeacherModel)),
        },
    },
    async resolve({ role }: LMSCtx, { teachers }, { state }: Request) {
        switch (role) {
            case LmsContextMembershipRole.admin:
            case LmsContextMembershipRole.freelancer:
                let createdTeachers = []
                if (_.isArray(teachers)) {
                    const batch = teachers.map(({ email, ...teacher }) => ({ email, teacher }))
                    createdTeachers = await teachersServices.bulkCreateTeachers(batch, state)
                }
                return createdTeachers
        }

        throw httpErrors.unauthorized('Unauthorized To Create Teachers')
    },
}
