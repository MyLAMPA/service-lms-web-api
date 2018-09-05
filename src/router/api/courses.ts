
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as coursesControllers from '../../controllers/courses'

const router = Router()

router
    .route('/')
    .get(handleController(coursesControllers.getCourses))
    .post(limitToRole(UserRole.admin), handleController(coursesControllers.postCourses))

router
    .route('/:courseId')
    .get(handleController(coursesControllers.getCourse))
    .put(limitToRole(UserRole.admin), handleController(coursesControllers.putCourse))

export { router }
