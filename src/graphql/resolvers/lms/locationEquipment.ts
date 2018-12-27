
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
    ContextMembershipRole,
} from '../../../types'
import { Model as LocationEquipmentModel } from '../../types/lms/locationEquipment'
import * as locationEquipmentsServices from '../../../services/locationEquipments'

export const locationEquipment = {
    type: LocationEquipmentModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({ role }: LMSCtx, { id }, { state }: Request) {
        switch (role) {
            case ContextMembershipRole.admin:
            case ContextMembershipRole.teacher:
            case ContextMembershipRole.student:
        }

        if (!_.isNil(id)) {
            const locationEquipment = await locationEquipmentsServices.getLocationEquipmentById(id, state)
            return locationEquipment
        }
        return null
    },
}

export const locationEquipments = {
    type: new GraphQLList(LocationEquipmentModel),
    args: {},
    async resolve({ role, contextId: context }: LMSCtx, {}, { state }: Request) {
        const searchParams: any = { context }

        switch (role) {
            case ContextMembershipRole.teacher:
            case ContextMembershipRole.student:
                return []
        }

        const locationEquipments = await locationEquipmentsServices.getLocationsEquipments(searchParams, state)
        return locationEquipments
    },
}
