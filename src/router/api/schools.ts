
import { Router } from 'express'

import { handleController, validateReqParams } from '../../middlewares'
import * as schoolsControllers from '../../controllers/schools'
import * as schoolsDefs from './schools.def'

const router = Router()

router
    .route('/:schoolId')
    .get(handleController(schoolsControllers.getSchool))
    .patch(validateReqParams(schoolsDefs.patchSchool), handleController(schoolsControllers.patchSchool))

export { router }
