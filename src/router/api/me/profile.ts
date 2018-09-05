
import { Router } from 'express'

import { handleController } from '../../../middlewares'
import * as profileControllers from '../../../controllers/me/profile'

const router = Router()

router
    .route('/')
    .get(handleController(profileControllers.getProfile))
    .put(handleController(profileControllers.putProfile))

export { router }
