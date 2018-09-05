
import { Request, Response } from 'express'
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors, httpErrors } from '../../errors'
import {
    UserRole,
} from '../../models'
import * as lessonsServices from '../../services/lessons'

export async function postLessonTeachersNotes(req: Request) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const updatedLesson = await lessonsServices.createTeachersNote(lessonId, req.body, req.state)
    return updatedLesson
}
