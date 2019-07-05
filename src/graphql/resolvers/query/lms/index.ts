
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { httpErrors } from '../../../../errors'
import { LMSContextMembershipRoleEnum } from '../../../types/enums'
import { context } from './context'
import { course, courses } from './course'
import { group, groups } from './group'
import { lesson, lessons } from './lesson'
import { location, locations } from './location'
import { locationEquipment, locationEquipments } from './locationEquipment'
import { schoolYears } from './schoolYears'
import { student, students } from './student'
import { teacher, teachers } from './teacher'
import * as lmsContextServices from '../../../../services/lms/lmsContexts'

export const lms = {
    type: new GraphQLObjectType({
        name: 'LMSContext',
        fields: {
            contextMembershipRole: {
                type: LMSContextMembershipRoleEnum,
                resolve: ({ role }) => role ? role : null,
            },
            context,
            schoolYears,
            course, courses,
            group, groups,
            lesson, lessons,
            location, locations,
            locationEquipment, locationEquipments,
            student, students,
            teacher, teachers,
        },
    }),
    args: {
        membership: {
            type: GraphQLString,
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
