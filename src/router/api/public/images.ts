
import { Router } from 'express'

import { handleController } from '../../../middlewares'
import * as imagesControllers from '../../../controllers/public/images'

const router = Router()

router
    .route('/')
    .post(handleController(imagesControllers.postImages))

export { router }
