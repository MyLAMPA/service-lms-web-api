
import { Request, Response } from 'express'
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors, httpErrors } from '../../errors'
import {
    UserRole,
} from '../../models'
import * as lessonsServices from '../../services/lessons'

export enum LessonOutcomesSource {
    suggestion = 'suggestion',
    lesson = 'lesson',
}

export async function getLessonOutcomes(req: Request) {
    const source: LessonOutcomesSource = req.query.source
    const lessonId = req.params.lessonId
    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw errors.forbidden('Forbidden Lesson')
    }

    switch (req.state.activeRole) {
        case UserRole.teacher:
            if ((<any>lesson.teachers).map(teacherId => String(teacherId)).indexOf(String(req.state.user._id)) < 0) {
                // TODO: extend restrictions - allow other teachers of the same group to see all lesson's details (including chat /teachersNotes/)
                throw errors.forbidden('Forbidden Lesson')
            }
        case UserRole.student:
            if ((<any>lesson.students).map(studentId => String(studentId)).indexOf(String(req.state.user._id)) < 0) {
                throw errors.forbidden('Forbidden Lesson')
            }
        default:
            break
    }

    switch (source) {
        case LessonOutcomesSource.suggestion:
            const suggestedOutcomes = await lessonsServices.getSuggestedOutcomes(lessonId, req.state)
            return suggestedOutcomes
        case LessonOutcomesSource.lesson:
        default:
            const outcomes = await lessonsServices.getOutcomes(lessonId, req.state)
            return outcomes
    }
}

export async function postLessonOutcomes(req: Request) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    if (_.isArray(req.body)) {
        return await lessonsServices.createOutcomes(lessonId, req.body, req.state)
    }
    
    return await lessonsServices.createOutcomes(lessonId, [req.body], req.state)
}
