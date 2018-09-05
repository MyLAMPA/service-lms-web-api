
import { Router } from 'express'

import { handleController } from '../../../middlewares'
import * as tokensController from '../../../controllers/auth/tokens'

const router = Router()

router
    .route('/reissue')
    .post(handleController(tokensController.postTokensReissue))

export { router }
