
import * as _ from 'lodash'

import {
    State,
    LocationEquipment,
} from '../models'
import * as db from '../repositories/mongo'

export async function getLocationsEquipments(state: State): Promise<LocationEquipment[]> {
    const locationsEquipments = await db.locationEquipment.find({ school: state.school._id })
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
