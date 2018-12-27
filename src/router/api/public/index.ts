
import { Router } from 'express'

import { router as graphqlRouter } from './graphql'
import { router as contextsRouter } from './contexts'

const router = Router()

router.use('/graphql', graphqlRouter)
router.use('/contexts', contextsRouter)

export { router }
