
import { Router } from 'express'

import { router as graphqlRouter } from './graphql'
import { router as lmsContextsRouter } from './lmsContexts'
import { router as imagesRouter } from './images'

const router = Router()

router.use('/graphql', graphqlRouter)
router.use('/lmsContexts', lmsContextsRouter)
router.use('/images', imagesRouter)

export { router }
