
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
} from '../../../types'
import { Model as SchoolModel } from '../../types/lms/school'
import * as schoolsServices from '../../../services/schools'

export const school = {
    type: SchoolModel,
    args: {},
    async resolve(lmsCtx: LMSCtx, {}, { state }: Request) {
        const school = await schoolsServices.getSchoolById(lmsCtx.schoolId, true, state)
        return school
    },
}
