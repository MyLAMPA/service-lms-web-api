
import { Router } from 'express'

import { handleController, limitToRole } from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import * as lessonsControllers from '../../../controllers/lessons'

import { router as lessonPlanRouter } from './lessonPlan'
import { router as activitiesRouter } from './activities'
import { router as lessonAttendanceRouter } from './attendance'
import { router as lessonReachersNotesRouter } from './teachersNotes'
import { router as lessonOutcomesRouter } from './outcomes'

const router = Router()

router
    .route('/')
    .get(handleController(lessonsControllers.getLessons))
    .post(limitToRole(UserRole.admin), handleController(lessonsControllers.postLessons))

router
    .route('/:lessonId')
    .get(handleController(lessonsControllers.getLesson))
    .put(limitToRole(UserRole.admin), handleController(lessonsControllers.putLesson))

router.use('/', lessonPlanRouter)
router.use('/', activitiesRouter)
router.use('/', lessonAttendanceRouter)
router.use('/', lessonReachersNotesRouter)
router.use('/', lessonOutcomesRouter)

export { router }
