
import { Router } from 'express'

import { handleController } from '../../../middlewares'
import * as loginController from '../../../controllers/auth/login'

const router = Router()

router
    .route('/')
    .post(handleController(loginController.postLogin))

export { router }
