
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    LMSContextMembershipRole,
} from '../../../../types'
import { Model as LocationModel } from '../../../types/lms/location'
import * as locationsServices from '../../../../services/lms/locations'

export const location = {
    type: LocationModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        switch (role) {
            case LMSContextMembershipRole.admin:
            case LMSContextMembershipRole.teacher:
            case LMSContextMembershipRole.student:
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
    async resolve({ role, contextId: context }: LMSCtx, {}, { state }: Request) {
        const searchParams: any = { context }

        switch (role) {
            case LMSContextMembershipRole.teacher:
            case LMSContextMembershipRole.student:
                return []
        }

        const groups = await locationsServices.getLocations(searchParams, true, state)
        return groups
    },
}
