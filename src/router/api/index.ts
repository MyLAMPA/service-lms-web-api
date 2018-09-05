
import { Router } from 'express'

import { authorizeRequest } from '../../middlewares'
import { router as aggregationRouter } from './aggregation'
import { router as authRouter } from './auth'
import { router as meRouter } from './me'
import { router as schoolRouter } from './school'
import { router as schoolYearsRouter } from './schoolYears'
import { router as locationsRouter } from './locations'
import { router as locationsEquipmentRouter } from './locationsEquipment'
import { router as teachersRouter } from './teachers'
import { router as studentsRouter } from './students'
import { router as coursesRouter } from './courses'
import { router as groupsRouter } from './groups'
import { router as lessonsRouter } from './lessons'
import { router as lessonPlanTemplatesRouter } from './lessonPlanTemplates'
import { router as lessonActivitiesRouter } from './lessonActivities'
import { router as homeworksRouter } from './homeworks'

const router = Router()

router.use('/aggregation', authorizeRequest, aggregationRouter)
router.use('/auth', authRouter)
router.use('/me', authorizeRequest, meRouter)
router.use('/school', authorizeRequest, schoolRouter)
router.use('/schoolYears', authorizeRequest, schoolYearsRouter)
router.use('/locations', authorizeRequest, locationsRouter)
router.use('/locationsEquipment', authorizeRequest, locationsEquipmentRouter)
router.use('/teachers', authorizeRequest, teachersRouter)
router.use('/students', authorizeRequest, studentsRouter)
router.use('/courses', authorizeRequest, coursesRouter)
router.use('/groups', authorizeRequest, groupsRouter)
// router.use('/lessons', authorizeRequest, lessonsRouter)
router.use('/lessons', lessonsRouter)
router.use('/lessonPlanTemplates', authorizeRequest, lessonPlanTemplatesRouter)
router.use('/lessonActivities', authorizeRequest, lessonActivitiesRouter)
router.use('/homeworks', authorizeRequest, homeworksRouter)

export { router }
