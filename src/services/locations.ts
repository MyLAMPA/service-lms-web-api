
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Location,
} from '../models'
import * as db from '../repositories/mongo'

export async function getLocations(params: object, populateEquipment: boolean, state: State): Promise<Location[]> {
    let locationsExec = db.locations.find(params)
    if (populateEquipment) {
        locationsExec = locationsExec.populate('equipment')
    }
    const locations = await locationsExec.lean()
    return locations
}

export async function getLocationById(locationId: string, state: State): Promise<Location> {
    const location = await db.locations.findById(locationId).lean()
    if (!_.isNil(location)) {
        return location // .toObject()
    }
    throw errors.notFound('Location Not Found')
}

export async function createLocation(location: Location, state: State): Promise<Location> {
    const _location = _.merge(
        {},
        _.pick(location, ['name', 'abbr', 'description', 'capacity', 'equipment', 'color']),
        { school: state.school._id }
    )
    const createdLocation = await db.locations.create(_location)
    return createdLocation.toObject()
}

export async function updateLocationById(locationId: string, change: object, state: State): Promise<Location> {
    await db.locations.findByIdAndUpdate(locationId, change)
    return getLocationById(locationId, state)
}
