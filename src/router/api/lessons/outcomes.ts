
import { Router } from 'express'

import { handleController, validateReqParams, limitToRole } from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import * as outcomesDefs from './outcomes.def'
import * as lessonOutcomesControllers from '../../../controllers/lessons/outcomes'

const router = Router()

router
    .route('/:lessonId/outcomes')
    .get(limitToRole([UserRole.admin, UserRole.teacher]), validateReqParams(outcomesDefs.getLessonOutcomes), handleController(lessonOutcomesControllers.getLessonOutcomes))
    .post(limitToRole([UserRole.admin, UserRole.teacher]), handleController(lessonOutcomesControllers.postLessonOutcomes))

export { router }
