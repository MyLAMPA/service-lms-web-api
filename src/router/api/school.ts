
import { Router } from 'express'

import {
    handleController,
//     limitToRole,
} from '../../middlewares'
// import {
//     UserRole,
// } from '../../models'
// import * as schoolControllers from '../../controllers/school'

const router = Router()

router
    .route('/')
//     .get(handleController(schoolControllers.getSchool))
//     .put(limitToRole(UserRole.admin), handleController(schoolControllers.putSchool))

export { router }
