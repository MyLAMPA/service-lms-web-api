
import { Request, Response, NextFunction } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    UserRole,
    CRUD,
    Lesson,
} from '../../models'
import * as lessonsServices from '../../services/lessons'

const lesson = async (
    lessonId: string,
    operation: CRUD,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const lesson = await lessonsServices.getLessonById(lessonId, req.state)

        if (String(lesson.school) !== String(req.state.school._id)) {
            throw errors.forbidden('Forbidden Lesson')
        }

        switch (req.state.activeRole) {
            case UserRole.admin:
                return next()
            case UserRole.teacher:
                if ((<any>lesson.teachers).map(teacherId => String(teacherId)).indexOf(String(req.state.user._id)) >= 0) {
                    if (operation === CRUD.read || operation === CRUD.update) {
                        return next()
                    }
                }
            case UserRole.student:
                if ((<any>lesson.students).map(studentId => String(studentId)).indexOf(String(req.state.user._id)) >= 0) {
                    if (operation === CRUD.read) {
                        return next()
                    }
                }
        }

        throw errors.forbidden('Forbidden Lesson')
    } catch (err) {
        next(err)
    }
}
