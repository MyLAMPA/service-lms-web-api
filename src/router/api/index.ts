
import { Router } from 'express'

import { authorizeRequest } from '../../middlewares'
import { router as schoolRouter } from './school'

const router = Router()

router.use('/school', authorizeRequest, schoolRouter)

export { router }
