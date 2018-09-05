
import { Router } from 'express'

import { handleController, limitToRole } from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import * as lessonPlansControllers from '../../../controllers/lessons/lessonPlan'
import * as lessonPlanExportControllers from '../../../controllers/export/lessonPlan'

const router = Router()

router
    .route('/:lessonId/lessonPlan')
    .get(limitToRole([UserRole.admin, UserRole.teacher, UserRole.student]), handleController(lessonPlansControllers.getLessonPlan))
    .put(limitToRole([UserRole.admin, UserRole.teacher]), handleController(lessonPlansControllers.putLessonPlan))

router
    .route('/:lessonId/lessonPlan/outcomes')
    // .get(limitToRole([UserRole.admin, UserRole.teacher, UserRole.student]), handleController())
    // .post(limitToRole([UserRole.admin, UserRole.teacher]), handleController())

router
    .route('/:lessonId/lessonPlan/export')
    // .get(limitToRole([UserRole.admin, UserRole.teacher]), handleController(lessonPlanExportControllers.getLessonPlanExport, false))
    .get(handleController(lessonPlanExportControllers.getLessonPlanExport, false))

export { router }
