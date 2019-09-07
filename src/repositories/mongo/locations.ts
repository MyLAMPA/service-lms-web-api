
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Location,
} from '../../types'
import { source } from './source'
import { locationSchema, LocationName } from './schemas/location'

const locationsCollection = source.collection<Location>(
    LocationName,
    locationSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-locations`
)

export async function getLocations(params: object, state: State): Promise<Location[]> {
    const locations = await locationsCollection.find(params)
    return locations
        .filter(location => !_.isEmpty(location))
        .map(location => <Location>location)
}

export async function getLocationById(locationId: string, state: State): Promise<Location> {
    const location = await locationsCollection.findById(locationId)
    if (!_.isEmpty(location)) {
        return location
    }
    return null
}
