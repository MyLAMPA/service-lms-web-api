
import * as _ from 'lodash'
import * as moment from 'moment'

import { config } from '../../config'
import {
    State,
} from '../../models'
import {
    Homework,
} from '../../types/lms'
import { source } from './source'
import { homeworkSchema, HomeworkName } from './schemas/homework'

const homeworksCollection = source.collection<Homework>(
    HomeworkName,
    homeworkSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}homeworks`
)

const withPopulation = (fields: string[]) =>
    (exec, activeFields: { [key: string]: boolean; }) => {
        const fieldsToPopulate = fields.filter(field => activeFields[field])
        return exec.populate(fieldsToPopulate.join(' '))
    }

const enablePopulation = withPopulation(['dueLesson', 'originLesson'])

export async function getHomeworks(params: object, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework[]> {
    const homeworksExec = homeworksCollection.find(params)
    const homeworks = await enablePopulation(homeworksExec, { dueLesson: populateDueLesson, originLesson: populateOriginLesson })
    return homeworks
}

export async function getHomeworkById(homeworkId: string, populateDueLesson: boolean, populateOriginLesson: boolean, state: State): Promise<Homework> {
    const homeworkExec = homeworksCollection.findById(homeworkId)
    const homework = await enablePopulation(homeworkExec, { dueLesson: populateDueLesson, originLesson: populateOriginLesson })

    if (!_.isEmpty(homework)) {
        return homework
    }
    return null
}

export async function createHomework(document: Homework, state: State): Promise<Homework> {
    const createdHomework = await homeworksCollection.create(document)
    return createdHomework
}

export async function updateHomeworkById(homeworkId: string, change: object, state: State): Promise<void> { 
    await homeworksCollection.findByIdAndUpdate(homeworkId, change)
}

export async function deleteHomeworkById(homeworkId: string, state: State): Promise<Homework> {
    const homework = await homeworksCollection.findByIdAndRemove(homeworkId)
    if (!_.isEmpty(homework)) {
        return homework
    }
    return null
}
