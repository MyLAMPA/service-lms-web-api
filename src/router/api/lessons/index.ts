
import { Router } from 'express'

import { authorizeRequest, handleController, limitToRole } from '../../../middlewares'
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
    .get(authorizeRequest, handleController(lessonsControllers.getLessons))
    .post(authorizeRequest, limitToRole(UserRole.admin), handleController(lessonsControllers.postLessons))

router
    .route('/:lessonId')
    .get(authorizeRequest, handleController(lessonsControllers.getLesson))
    .put(authorizeRequest, limitToRole(UserRole.admin), handleController(lessonsControllers.putLesson))

router.use('/', lessonPlanRouter)
router.use('/', authorizeRequest, activitiesRouter)
router.use('/', authorizeRequest, lessonAttendanceRouter)
router.use('/', authorizeRequest, lessonReachersNotesRouter)
router.use('/', authorizeRequest, lessonOutcomesRouter)

export { router }
