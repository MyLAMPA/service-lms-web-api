
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    LocationEquipment,
} from '../models'
import * as db from '../repositories/mongo'

export async function getLocationEquipmentById(locationEquipmentId: string, state: State): Promise<LocationEquipment> {
    const locationEquipment = await db.locationEquipment.findById(locationEquipmentId)
    if (locationEquipment) {
        return locationEquipment
    }
    throw errors.notFound('LocationEquipment Not Found')
}

export async function getLocationsEquipments(params: object, state: State): Promise<LocationEquipment[]> {
    const locationsEquipments = await db.locationEquipment.find(params)
    return locationsEquipments.map(locationEquipment => locationEquipment.toObject())
}

export async function createLocationEquipment(locationEquipment: LocationEquipment, state: State): Promise<LocationEquipment> {
    const _locationEquipment = await db.locationEquipment.create(
        _.merge(
            {},
            _.pick(locationEquipment, ['title', 'describtion']),
            { school: state.school._id }
        )
    )
    return _locationEquipment.toObject()
}
