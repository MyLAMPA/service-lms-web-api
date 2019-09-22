
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
    Location,
} from '../../types'
import { locationsRepository } from '../../repositories'

export const getLocations = async(params: object, populateEquipment: boolean, state: State): Promise<Location[]> => {
    const locations = await locationsRepository.getLocations(params, state)
    return locations
}

export const getLocationById = async(locationId: string, state: State): Promise<Location> => {
    const location = await locationsRepository.getLocationById(locationId, state)
    if (location) {
        return location
    }
    throw errors.notFound('Location Not Found')
}

export const createLocation = async(location: Location, state: State): Promise<Location> => {
    const createdLocation = await locationsRepository.createLocation({ context: state.lmsCtx.contextId, ...location })
    return createdLocation
}

// export async function updateLocationById(locationId: string, change: object, state: State): Promise<Location> {
//     await db.locations.findByIdAndUpdate(locationId, change)
//     return getLocationById(locationId, state)
// }
