
import { Router } from 'express'

import { handleController, validateReqParams } from '../../../middlewares'
import * as lmsContextsControllers from '../../../controllers/internal/lmsContexts'
import * as lmsContextsDefs from './lmsContexts.def'

const router = Router()

router
    .route('/:contextId')
    .get(handleController(lmsContextsControllers.getLMSContext))
    .patch(validateReqParams(lmsContextsDefs.patchLMSContext), handleController(lmsContextsControllers.patchLMSContext))

export { router }
