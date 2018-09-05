
import { Router } from 'express'

import { handleController, limitToRole } from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import * as lessonAttendanceControllers from '../../../controllers/lessons/attendance'

const router = Router()

router
    .route('/:lessonId/attendance')
    .post(limitToRole([UserRole.admin, UserRole.teacher]), handleController(lessonAttendanceControllers.postLessonAttendance))

export { router }
