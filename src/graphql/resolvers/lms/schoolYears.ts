
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
import { SchoolYear } from '../../types'
import * as schoolYearsServices from '../../../services/schoolYears'

export const schoolYears = {
    type: new GraphQLList(SchoolYear.Model),
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
