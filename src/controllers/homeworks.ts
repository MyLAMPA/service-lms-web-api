
import { Request } from 'express'
import * as _ from 'lodash'

import { httpErrors } from '../errors'
import { toBoolean } from '../helpers/convert'
import * as homeworksServices from '../services/homeworks'

export async function getHomeworks(req: Request) {
    const { dueLesson, originLesson } = req.query

    const populateDueLesson = toBoolean(req.query.populateDueLesson)
    const populateOriginLesson = toBoolean(req.query.populateOriginLesson)

    const query: any = { school: String(req.state.school._id) }

    if (_.isString(dueLesson)) {
        query.dueLesson = { $in: dueLesson.replace(/\s/g, '').split(';') }
    }

    if (_.isString(originLesson)) {
        query.originLesson = { $in: originLesson.replace(/\s/g, '').split(';') }
    }

    const homeworks = await homeworksServices.getHomeworks(query, populateDueLesson, populateOriginLesson, req.state)
    return homeworks
}

export async function postHomeworks(req: Request) {
    const homework = await homeworksServices.createHomework(req.body, req.state)
    return homework
}

export async function getHomework(req: Request) {
    const homeworkId: string = req.params.homeworkId

    const populateDueLesson = toBoolean(req.query.populateDueLesson)
    const populateOriginLesson = toBoolean(req.query.populateOriginLesson)

    const homework = await homeworksServices.getHomeworkById(homeworkId, populateDueLesson, populateOriginLesson, req.state)

    if (String(homework.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Homework')
    }

    return homework
}

export async function deleteHomework(req: Request) {
    const homeworkId: string = req.params.homeworkId

    const homework = await homeworksServices.getHomeworkById(homeworkId, false, false, req.state)

    if (String(homework.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Homework')
    }

    await homeworksServices.deleteHomeworkById(homeworkId, req.state)

    return homework
}
