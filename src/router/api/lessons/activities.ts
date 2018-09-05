
import { Router } from 'express'

import {
    handleController,
    limitToRole,
    validateReqParams,
} from '../../../middlewares'
import {
    UserRole,
} from '../../../models'
import {
    putActivitiesDef,
    postActivitiesDef,
} from './activities.defs'
import * as activitiesControllers from '../../../controllers/lessons/activities'

const router = Router()

router
    .route('/:lessonId/activities')
    .get(limitToRole([UserRole.admin, UserRole.teacher]), handleController(activitiesControllers.getActivities))
    .post(limitToRole([UserRole.admin, UserRole.teacher]), validateReqParams(postActivitiesDef), handleController(activitiesControllers.postActivities))
    .put(limitToRole([UserRole.admin, UserRole.teacher]), validateReqParams(putActivitiesDef), handleController(activitiesControllers.putActivities))

export { router }
