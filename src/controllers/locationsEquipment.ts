
import { Request, Response } from 'express'

import * as locationsEquipmentsServices from '../services/locationsEquipments'

export async function getLocationsEquipment(req: Request, res: Response) {
    const locationsEquipment = await locationsEquipmentsServices.getLocationsEquipments(req.state)
    return locationsEquipment
}

export async function postLocationsEquipment(req: Request, res: Response) {
    const locationEquipment = await locationsEquipmentsServices.createLocationEquipment(req.body, req.state)
    return locationEquipment
}
