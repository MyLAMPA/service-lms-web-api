/*
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    State,
    Homework,
} from '../models'
import * as source from '../repositories/mongo/source'

const withPopulation = (fields: string[]) =>
    (exec, activeFields: { [key: string]: boolean; }) => {
        const fieldsToPopulate = fields.filter(field => activeFields[field])
        return exec.populate(fieldsToPopulate.join(' '))
    }

const enablePopulation = withPopulation(['dueLesson', 'originLesson'])

export async function getHomeworks(params: object, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework[]> {
    const homeworksExec = source.homeworks.find(params)
    const homeworks = await enablePopulation(homeworksExec, { dueLesson: populateDueLesson, originLesson: populateOriginLesson })
    return homeworks
}

export async function getHomeworkById(homeworkId: string, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework> {
    const homeworkExec = source.homeworks.findById(homeworkId)
    const homework = await enablePopulation(homeworkExec, { dueLesson: populateDueLesson, originLesson: populateOriginLesson })

    if (!_.isEmpty(homework)) {
        return homework
    }
    return null
}

export async function createHomework(document: Homework, state: State): Promise<Homework> {
    const createdHomework = await source.homeworks.create(document)
    return createdHomework
}

export async function updateHomeworkById(homeworkId: string, change: object, state: State): Promise<void> { 
    await source.homeworks.findByIdAndUpdate(homeworkId, change)
}

export async function deleteHomeworkById(homeworkId: string, state: State): Promise<Homework> {
    const homework = await source.homeworks.findByIdAndRemove(homeworkId)
    if (!_.isEmpty(homework)) {
        return homework
    }
    return null
}
*/