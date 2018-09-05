
import { Router } from 'express'

import { router as lessonsAggregationRouter } from './lessons'

const router = Router()

router.use('/lessons', lessonsAggregationRouter)

export { router }
