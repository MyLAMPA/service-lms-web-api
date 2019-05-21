
import { Router } from 'express'

import { handleController, validateReqParams } from '../../../middlewares'
import * as lmsContextsControllers from '../../../controllers/public/lmsContexts'
import * as lmsContextsDefs from './lmsContexts.def'

const router = Router()

router
    .route('/')
    .post(validateReqParams(lmsContextsDefs.postLMSContexts), handleController(lmsContextsControllers.postLMSContexts))

router
    .route('/:contextId')
    .patch(validateReqParams(lmsContextsDefs.patchLMSContext), handleController(lmsContextsControllers.patchLMSContext))

export { router }
