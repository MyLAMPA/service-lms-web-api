
import { Router } from 'express'

import { authorizeUserRequest, authorizeRequest } from '../../middlewares'
import { router as internalRouter } from './internal'
import { router as publicRouter } from './public'

const router = Router()

router.use('/internal', authorizeRequest, internalRouter)
router.use('/public', authorizeUserRequest, publicRouter)

export { router }
