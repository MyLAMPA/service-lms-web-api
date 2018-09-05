
import { Router } from 'express'

import { handleController } from '../../../middlewares'
import * as lessonsAggregationController from '../../../controllers/aggregation/lessons'

const router = Router()

router
    .route('/:lessonId/detail')
    .get(handleController(lessonsAggregationController.getLessonDetail))

router
    .route('/:lessonId/attendance')
    .get(handleController(lessonsAggregationController.getLessonAttendance))

router
    .route('/:lessonId/teachersNotes')
    .get(handleController(lessonsAggregationController.getLessonTeachersNotes))

export { router }
