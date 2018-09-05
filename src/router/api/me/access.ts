
import { Router } from 'express'

import { handleController } from '../../../middlewares'
import * as accessControllers from '../../../controllers/me/access'

const router = Router()

router
    .route('/')
    .get(handleController(accessControllers.getAccess))

export { router }
