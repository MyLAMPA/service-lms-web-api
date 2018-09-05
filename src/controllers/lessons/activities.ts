
import { Request, Response } from 'express'
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors, httpErrors } from '../../errors'
import {
    UserRole,
} from '../../models'
import * as lessonsServices from '../../services/lessons'

export async function getActivities(req: Request) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const activities = await lessonsServices.getActivities(lessonId, req.state)
    return activities
}

export async function postActivities(req: Request) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const activityIds: string[] = req.body
    const updatedActivities = await lessonsServices.addActivityToLesson(lessonId, activityIds, req.state)
    return updatedActivities
}

export async function putActivities(req: Request) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const updatedActivities = await lessonsServices.updateActivities(lessonId, req.body, req.state)
    return updatedActivities
}
