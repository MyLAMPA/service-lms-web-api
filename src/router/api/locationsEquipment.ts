
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as locationsEquipmentControllers from '../../controllers/locationsEquipment'

const router = Router()

router
    .route('/')
    .get(handleController(locationsEquipmentControllers.getLocationsEquipment))
    .post(limitToRole(UserRole.admin), handleController(locationsEquipmentControllers.postLocationsEquipment))

export { router }
