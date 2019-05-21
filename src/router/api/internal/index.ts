
import { Router } from 'express'

import { router as lmsContextsRouter } from './lmsContexts'

const router = Router()

router.use('/lmsContexts', lmsContextsRouter)

export { router }
