
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as lessonPlanTemplatesControllers from '../../controllers/lessonPlanTemplates'

const router = Router()

router
    .route('/')
    .get(handleController(lessonPlanTemplatesControllers.getLessonPlanTemplates))
    .post(handleController(lessonPlanTemplatesControllers.postLessonPlanTemplates))

router
    .route('/:lessonPlanTemplateId')
    .get(handleController(lessonPlanTemplatesControllers.getLessonPlanTemplate))
    .put(handleController(lessonPlanTemplatesControllers.putLessonPlanTemplate))

export { router }
