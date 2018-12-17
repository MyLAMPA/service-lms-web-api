
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../models'
import {
    LMSCtx,
} from '../../types/lms'
import * as schoolMembershipsServices from '../schoolMemberships'

export async function resolveContext(schoolMembershipId: string, state: State): Promise<LMSCtx> {
    const schoolMembership = await schoolMembershipsServices.getSchoolMembershipById(schoolMembershipId, state)

    if (String(schoolMembership.user) !== String(state.user._id)) {
        throw errors.unauthorized('Forbidden SchoolMembership')
    }

    return {
        role: schoolMembership.role,
        membershipId: String(schoolMembership._id),
        schoolId: String(schoolMembership.school),
        userId: String(schoolMembership.user),
        studentId: null,
        teacherId: null,
    }
}
