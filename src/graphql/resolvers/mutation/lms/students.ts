
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
    Model as StudentModel,
    CreateModel as CreateStudentModel,
} from '../../../types/lms/student'
import * as studentsServices from '../../../../services/lms/students'

export const createStudents = {
    type: new GraphQLList(StudentModel),
    args: {
        students: {
            type: new GraphQLNonNull(new GraphQLList(CreateStudentModel)),
        },
    },
    async resolve({ role }: LMSCtx, { students }, { state }: Request) {
        switch (role) {
            case LmsContextMembershipRole.admin:
            case LmsContextMembershipRole.freelancer:
                let createdStudents = []
                if (_.isArray(students)) {
                    const batch = students.map(({ email, ...student }) => ({ email, student }))
                    createdStudents = await studentsServices.bulkCreateStudents(batch, state)
                }
                return createdStudents
        }

        throw httpErrors.unauthorized('Unauthorized To Create Students')
    },
}
