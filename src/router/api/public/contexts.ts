
import { Router } from 'express'

import { handleController, validateReqParams } from '../../../middlewares'
import * as contextsControllers from '../../../controllers/public/contexts'
import * as contextsDefs from './contexts.def'

const router = Router()

router
    .route('/')
    .post(validateReqParams(contextsDefs.postContexts), handleController(contextsControllers.postContexts))

router
    .route('/:contextId')
    .patch(validateReqParams(contextsDefs.patchContext), handleController(contextsControllers.patchContext))

export { router }
