
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    LMSCtx,
} from '../types'
import * as schoolMembershipsServices from './schoolMemberships'

export async function resolveContext(schoolMembershipId: string, state: State): Promise<LMSCtx> {
    const schoolMembership = await schoolMembershipsServices.getSchoolMembershipById(schoolMembershipId, state)

    if (schoolMembership.user !== state.idCtx.userId) {
        throw errors.unauthorized('Forbidden Context')
    }

    return {
        role: schoolMembership.role,
        membershipId: String(schoolMembership._id),
        schoolId: String(schoolMembership.school),
        userId: schoolMembership.user,
        studentId: null,
        teacherId: null,
    }
}
