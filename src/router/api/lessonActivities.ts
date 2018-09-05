
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as lessonActivitiesControllers from '../../controllers/lessonActivities'

const router = Router()

router
    .route('/')
    .get(handleController(lessonActivitiesControllers.getLessonActivities))
    .post(handleController(lessonActivitiesControllers.postLessonActivities))

router
    .route('/:lessonActivityId')
    .get(handleController(lessonActivitiesControllers.getLessonActivity))
    .put(handleController(lessonActivitiesControllers.putLessonActivity))

export { router }
