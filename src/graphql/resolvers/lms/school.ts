
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { School } from '../../types'
import {
    LMSCtx,
} from '../../../types/lms'
import * as schoolsServices from '../../../services/schools'

export const school = {
    type: School.Model,
    args: {},
    async resolve(lmsCtx: LMSCtx, {}, { state }: Request) {
        const school = await schoolsServices.getSchoolById(lmsCtx.schoolId, true, state)
        return school
    },
}
