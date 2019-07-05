
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
    LocationEquipment,
} from '../../types'
import { locationEquipmentsRepository } from '../../repositories'

export async function getLocationsEquipments(params: object, state: State): Promise<LocationEquipment[]> {
    const locationsEquipments = await locationEquipmentsRepository.getLocationEquipments(params, state)
    return locationsEquipments
}

export async function getLocationEquipmentById(locationEquipmentId: string, state: State): Promise<LocationEquipment> {
    const locationEquipment = await locationEquipmentsRepository.getLocationEquipmentById(locationEquipmentId, state)
    if (locationEquipment) {
        return locationEquipment
    }
    throw errors.notFound('LocationEquipment Not Found')
}

// export async function createLocationEquipment(locationEquipment: LocationEquipment, state: State): Promise<LocationEquipment> {
//     const _locationEquipment = await db.locationEquipment.create(
//         _.merge(
//             {},
//             _.pick(locationEquipment, ['title', 'describtion']),
//             { school: state.school._id }
//         )
//     )
//     return _locationEquipment.toObject()
// }
