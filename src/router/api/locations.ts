
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as locationsControllers from '../../controllers/locations'

const router = Router()

router
    .route('/')
    .get(handleController(locationsControllers.getLocations))
    .post(limitToRole(UserRole.admin), handleController(locationsControllers.postLocations))

router
    .route('/:locationId')
    .get(handleController(locationsControllers.getLocation))
    .put(limitToRole(UserRole.admin), handleController(locationsControllers.putLocation))

export { router }
