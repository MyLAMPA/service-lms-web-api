
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Location,
} from '../models'

export async function getLocations(params: object, populateEquipment: boolean, state: State): Promise<Location[]> {
    throw errors.serverError('deprached api')
}

export async function getLocationById(locationId: string, state: State): Promise<Location> {
    throw errors.serverError('deprached api')
}

export async function createLocation(location: Location, state: State): Promise<Location> {
    throw errors.serverError('deprached api')
}

export async function updateLocationById(locationId: string, change: object, state: State): Promise<Location> {
    throw errors.serverError('deprached api')
}
