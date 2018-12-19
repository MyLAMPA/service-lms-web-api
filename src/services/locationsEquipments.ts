
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    LocationEquipment,
} from '../models'

export async function getLocationEquipmentById(locationEquipmentId: string, state: State): Promise<LocationEquipment> {
    throw errors.serverError('deprached api')
}

export async function getLocationsEquipments(params: object, state: State): Promise<LocationEquipment[]> {
    throw errors.serverError('deprached api')
}

export async function createLocationEquipment(locationEquipment: LocationEquipment, state: State): Promise<LocationEquipment> {
    throw errors.serverError('deprached api')
}
