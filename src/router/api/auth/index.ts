
import { Router } from 'express'

import { router as loginRouter } from './login'
import { router as tokensRouter } from './tokens'

const router = Router()

router.use('/login', loginRouter)
router.use('/tokens', tokensRouter)

export { router }
