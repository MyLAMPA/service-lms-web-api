
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
} from '../../../types/identity'
import { Model as SchoolYearModel } from '../../types/lms/schoolYear'
import * as schoolYearsServices from '../../../services/lms/schoolYears'

export const schoolYears = {
    type: new GraphQLList(SchoolYearModel),
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

        const schoolYears = await schoolYearsServices.getSchoolYears(searchParams, state)
        return schoolYears
    },
}
