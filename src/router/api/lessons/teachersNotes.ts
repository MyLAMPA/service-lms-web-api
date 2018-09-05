
import { Router } from 'express'

import { handleController, limitToRole } from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import * as teachersNotesControllers from '../../../controllers/lessons/teachersNotes'

const router = Router()

router
    .route('/:lessonId/teachersNotes')
    .post(limitToRole([UserRole.admin, UserRole.teacher]), handleController(teachersNotesControllers.postLessonTeachersNotes))

export { router }
