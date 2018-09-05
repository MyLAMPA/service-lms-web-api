
import { Request, Response } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import { toBoolean } from '../helpers/convert'
import {
    UserRole,
} from '../models'
import * as locationsServices from '../services/locations'
import * as lessonsServices from '../services/lessons'

export async function getLocations(req: Request, res: Response) {
    let query = null

    const populateEquipment = toBoolean(req.query.populateEquipment)

    switch (req.state.activeRole) {
        case UserRole.admin:
        case UserRole.teacher:
            query = { school: req.state.school._id }
            break
        default:
            throw errors.forbidden('Forbidden Locations')
    }

    const locations = await locationsServices.getLocations(query, populateEquipment, req.state)
    return locations
}

export async function postLocations(req: Request, res: Response) {
    if (req.state.activeRole !== UserRole.admin) {
        throw errors.forbidden('Admin Only')
    }
    const location = await locationsServices.createLocation(req.body, req.state)
    return location
}

export async function getLocation(req: Request, res: Response) {
    const location = await locationsServices.getLocationById(req.params.locationId, req.state)
    if (String(location.school) === String(req.state.school._id)) {
        return location
    }
    throw errors.forbidden('Forbidden Location')
}

export async function putLocation(req: Request, res: Response) {
    const locationId = req.params.locationId
    const location = await locationsServices.getLocationById(locationId, req.state)

    if (String(location.school) === String(req.state.school._id)) {
        if (req.state.activeRole === UserRole.admin) {
            const change = { $set: _.pick(req.body, ['name', 'abbr', 'description', 'capacity', 'equipment', 'color']) }
            return await locationsServices.updateLocationById(locationId, change, req.state)
        }

        throw errors.forbidden('Admin Only')
    }

    throw errors.forbidden('Forbidden Location')
}
