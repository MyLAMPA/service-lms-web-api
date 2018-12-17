
import { Router } from 'express'

import { authorizeRequest, handleController, limitToRole } from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import * as lessonPlansControllers from '../../../controllers/lessons/lessonPlan'
import * as lessonPlanExportControllers from '../../../controllers/export/lessonPlan'

const router = Router()

router
    .route('/:lessonId/lessonPlan')
    .get(authorizeRequest, limitToRole([UserRole.admin, UserRole.teacher, UserRole.student]), handleController(lessonPlansControllers.getLessonPlan))
    .put(authorizeRequest, limitToRole([UserRole.admin, UserRole.teacher]), handleController(lessonPlansControllers.putLessonPlan))

router
    .route('/:lessonId/lessonPlan/outcomes')
    // .get(authorizeRequest, limitToRole([UserRole.admin, UserRole.teacher, UserRole.student]), handleController())
    // .post(authorizeRequest, limitToRole([UserRole.admin, UserRole.teacher]), handleController())

router
    .route('/:lessonId/lessonPlan/export')
    // .get(limitToRole([UserRole.admin, UserRole.teacher]), handleController(lessonPlanExportControllers.getLessonPlanExport, false))
    .get(handleController(lessonPlanExportControllers.getLessonPlanExport, false))

export { router }
