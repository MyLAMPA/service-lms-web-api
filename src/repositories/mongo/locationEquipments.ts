
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    LocationEquipment,
} from '../../types'
import { source } from './source'
import { locationEquipmentSchema, LocationEquipmentName } from './schemas/locationEquipment'

const locationEquipmentsCollection = source.collection<LocationEquipment>(
    LocationEquipmentName,
    locationEquipmentSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-locationequipments`
)

export async function getLocationEquipments(params: object, state: State): Promise<LocationEquipment[]> {
    const locationEquipments = await locationEquipmentsCollection.find(params)
    return locationEquipments
        .filter(locationEquipment => !_.isEmpty(locationEquipment))
        .map(locationEquipment => <LocationEquipment>locationEquipment)
}

export async function getLocationEquipmentById(locationEquipmentId: string, state: State): Promise<LocationEquipment> {
    const locationEquipment = await locationEquipmentsCollection.findById(locationEquipmentId)
    if (!_.isEmpty(locationEquipment)) {
        return locationEquipment
    }
    return null
}
