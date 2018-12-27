
import { Router } from 'express'

import { router as contextsRouter } from './contexts'

const router = Router()

router.use('/contexts', contextsRouter)

export { router }
