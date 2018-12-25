
import { Router } from 'express'

import { router as schoolsRouter } from './schools'

const router = Router()

router.use('/schools', schoolsRouter)

export { router }
