
import { Request, Response } from 'express'
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors, httpErrors } from '../../errors'
import {
    UserRole,
} from '../../models'
import * as lessonsServices from '../../services/lessons'
import * as lessonPlansServices from '../../services/lessonPlans'

export async function putLessonPlan(req: Request) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const lessonPlanDiff = _.pick(req.body, ['title', 'topic', 'focus', 'materials'])
    if (!_.isEmpty(lessonPlanDiff)) {
        await lessonPlansServices.updateLessonPlan(lessonId, lessonPlanDiff, req.state)
    }

    if (_.isArray(req.body.outcomes) && req.body.outcomes.length > 0) {
        for (const i in req.body.outcomes) {
            const outcome = req.body.outcomes[i]
            await lessonPlansServices.mergeOutcomeToLessonPlan(lessonId, outcome, req.state)
        }
    }

    return await lessonPlansServices.getLessonPlan(lessonId, req.state)
}

export async function getLessonPlan(req: Request) {
    const lesson = await lessonsServices.getLessonById(req.params.lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw errors.forbidden('Forbidden Lesson')
    }

    switch (req.state.activeRole) {
        case UserRole.teacher:
            if ((<any>lesson.teachers).map(teacherId => String(teacherId)).indexOf(String(req.state.user._id)) < 0) {
                throw errors.forbidden('Forbidden Lesson')
            }
        case UserRole.student:
            if ((<any>lesson.students).map(studentId => String(studentId)).indexOf(String(req.state.user._id)) < 0) {
                throw errors.forbidden('Forbidden Lesson')
            }
        default:
            break
    }

    return lesson.lessonPlan
}
