
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as schoolYearsControllers from '../../controllers/schoolYears'

const router = Router()

router
    .route('/')
    .get(handleController(schoolYearsControllers.getSchoolYears))
    .post(limitToRole(UserRole.admin), handleController(schoolYearsControllers.postSchoolYears))

router
    .route('/:schoolYearId')
    .get(handleController(schoolYearsControllers.getSchoolYear))
    .put(limitToRole(UserRole.admin), handleController(schoolYearsControllers.putSchoolYear))
    .delete(limitToRole(UserRole.admin), handleController(schoolYearsControllers.deleteSchoolYear))

export { router }
