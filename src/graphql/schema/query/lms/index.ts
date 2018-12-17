
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { Context } from '../../../types/lms/context'
import * as lmsContextServices from '../../../../services/lms/context'
import * as schoolMembershipsServices from '../../../../services/schoolMemberships'

/*import { school } from '../../../resolvers/lms/school'
import { schoolYears } from '../../../resolvers/lms/schoolYears'
import { course, courses } from '../../../resolvers/lms/course'
import { group, groups } from '../../../resolvers/lms/group'
import { lesson } from '../../../resolvers/lms/lesson'
import { location, locations } from '../../../resolvers/lms/location'
import { locationEquipment, locationEquipments } from '../../../resolvers/lms/locationEquipment'
import { student, students } from '../../../resolvers/lms/student'
import { teacher, teachers } from '../../../resolvers/lms/teacher'

const LMS = new GraphQLObjectType({
    name: 'LMS',
    fields: {
        school,
        schoolYears,
        course, courses,
        group, groups,
        lesson,
        location, locations,
        locationEquipment, locationEquipments,
        student, students,
        teacher, teachers,
    },
})*/

const lms = {
    type: Context,
    args: {
        membership: {
            type: GraphQLString,
        },
    },
    async resolve({}, { membership: membershipId }, { state }: Request) {
        state.lmsCtx = await lmsContextServices.resolveContext(membershipId, state)
        return state.lmsCtx
    },
}

export { lms }
