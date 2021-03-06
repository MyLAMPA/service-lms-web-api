
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    LmsContextMembershipRole,
} from '../../../../types'
import { Model as SchoolYearModel } from '../../../types/lms/schoolYear'
import * as schoolYearsServices from '../../../../services/lms/schoolYears'

export const schoolYears = {
    type: new GraphQLList(SchoolYearModel),
    args: {},
    async resolve(lmsCtx: LMSCtx, {}, { state }: Request) {
        const searchParams: any = {
            school: lmsCtx.contextId,
        }

        switch (lmsCtx.role) {
            case LmsContextMembershipRole.teacher:
            case LmsContextMembershipRole.student:
                return []
        }

        const schoolYears = await schoolYearsServices.getSchoolYears(searchParams, state)
        return schoolYears
    },
}
