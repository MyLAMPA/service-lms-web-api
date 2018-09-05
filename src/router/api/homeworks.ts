
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as homeworksControllers from '../../controllers/homeworks'

const router = Router()

router
    .route('/')
    .get(handleController(homeworksControllers.getHomeworks))
    .post(limitToRole([UserRole.admin, UserRole.teacher]), handleController(homeworksControllers.postHomeworks))

router
    .route('/:homeworkId')
    .get(handleController(homeworksControllers.getHomework))
    .delete(limitToRole([UserRole.admin, UserRole.teacher]), handleController(homeworksControllers.deleteHomework))

export { router }
