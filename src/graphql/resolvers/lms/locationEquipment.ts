
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
import { LocationEquipment } from '../../types'
import * as locationEquipmentsServices from '../../../services/lms/locationEquipments'

export const locationEquipment = {
    type: LocationEquipment.Model,
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
            const locationEquipment = await locationEquipmentsServices.getLocationEquipmentById(id, state)
            return locationEquipment
        }
        return null
    },
}

export const locationEquipments = {
    type: new GraphQLList(LocationEquipment.Model),
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

        const locationEquipments = await locationEquipmentsServices.getLocationsEquipments(searchParams, state)
        return locationEquipments
    },
}
