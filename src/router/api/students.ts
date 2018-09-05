
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as studentsControllers from '../../controllers/students'

const router = Router()

router
    .route('/')
    .get(handleController(studentsControllers.getStudents))
    .post(limitToRole(UserRole.admin), handleController(studentsControllers.postStudents))

router
    .route('/:studentId')
    .get(handleController(studentsControllers.getStudent))
    .put(limitToRole(UserRole.admin), handleController(studentsControllers.putStudent))

export { router }
