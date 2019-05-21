
import { Router } from 'express'

import { router as graphqlRouter } from './graphql'
import { router as lmsContextsRouter } from './lmsContexts'

const router = Router()

router.use('/graphql', graphqlRouter)
router.use('/lmsContexts', lmsContextsRouter)

export { router }
