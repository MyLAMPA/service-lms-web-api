
import { Router } from 'express'

import { handleController, limitToRole } from '../../middlewares'
import {
    UserRole,
} from '../../models'
import * as groupsControllers from '../../controllers/groups'

const router = Router()

router
    .route('/')
    .get(handleController(groupsControllers.getGroups))
    .post(limitToRole(UserRole.admin), handleController(groupsControllers.postGroups))

router
    .route('/:groupId')
    .get(handleController(groupsControllers.getGroup))
    .put(limitToRole(UserRole.admin), handleController(groupsControllers.putGroup))

export { router }
