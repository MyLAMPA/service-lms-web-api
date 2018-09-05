
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as teachersControllers from '../../controllers/teachers'

const router = Router()

router
    .route('/')
    .get(handleController(teachersControllers.getTeachers))
    .post(limitToRole(UserRole.admin), handleController(teachersControllers.postTeachers))

router
    .route('/:teacherId')
    .get(handleController(teachersControllers.getTeacher))
    .put(limitToRole(UserRole.admin), handleController(teachersControllers.putTeacher))

export { router }
