
import { Router } from 'express'

import { router as accessRouter } from './access'
import { router as profileRouter } from './profile'

const router = Router()

router.use('/access', accessRouter)
router.use('/profile', profileRouter)

export { router }
