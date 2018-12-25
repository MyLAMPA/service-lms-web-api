
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    SchoolMembershipRole,
} from '../../../types'
import { Model as LocationModel } from '../../types/lms/location'
import * as locationsServices from '../../../services/locations'

export const location = {
    type: LocationModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve(lmsCtx: LMSCtx, { id }, { state }: Request) {
        switch (lmsCtx.role) {
            case SchoolMembershipRole.admin:
            case SchoolMembershipRole.teacher:
            case SchoolMembershipRole.student:
        }

        if (!_.isNil(id)) {
            const location = await locationsServices.getLocationById(id, state)
            return location
        }
        return null
    },
}

export const locations = {
    type: new GraphQLList(LocationModel),
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

        const groups = await locationsServices.getLocations(searchParams, true, state)
        return groups
    },
}
