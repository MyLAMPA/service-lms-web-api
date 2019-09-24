
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList,
} from 'graphql'

import { httpErrors } from '../../../../errors'
import * as lmsContextServices from '../../../../services/lms/lmsContexts'
import { createLocation } from './locations'
import { createCourse } from './courses'
import { createStudents } from './students'
import { createTeachers } from './teachers'

export const lms = {
    type: new GraphQLObjectType({
        name: 'M_Lms_Context',
        fields: {
            createLocation: createLocation as any,
            createCourse: createCourse as any,
            createStudents: createStudents as any,
            createTeachers: createTeachers as any,
        },
    }),
    args: {
        membership: {
            type: new GraphQLNonNull(GraphQLString),
        },
    },
    async resolve(source, { membership: membershipId }, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized('Unauthorized Request')
        }
        state.lmsCtx = await lmsContextServices.resolveLMSContextFromMembership(membershipId, state)
        return state.lmsCtx
    },
}
