
import { Router } from 'express'

import { handleController, validateReqParams } from '../../../middlewares'
import * as contextsControllers from '../../../controllers/internal/contexts'
import * as contextsDefs from './contexts.def'

const router = Router()

router
    .route('/:contextId')
    .get(handleController(contextsControllers.getContext))
    .patch(validateReqParams(contextsDefs.patchContext), handleController(contextsControllers.patchContext))

export { router }
