
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Lesson,
} from '../../types'
import { source } from './source'
import { LmsTableName } from './schemas'
import { lessonSchema } from './schemas/lesson'

const lessonsCollection = source.collection<Lesson>(
    LmsTableName.lesson,
    lessonSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-lessons`
)

export async function getLessons(params: object, state: State): Promise<Lesson[]> {
    const lessons = await lessonsCollection.find(params)
    return lessons
        .filter(lesson => !_.isEmpty(lesson))
        .map(lesson => <Lesson>lesson)
}

export async function getLessonById(lessonId: string, state: State): Promise<Lesson> {
    const lesson = await lessonsCollection.findById(lessonId)
    if (!_.isEmpty(lesson)) {
        return lesson
    }
    return null
}

export async function getOneLesson(params: object, state: State): Promise<Lesson> {
    const lesson = await lessonsCollection.findOne(params)
    if (!_.isEmpty(lesson)) {
        return lesson
    }
    return null
}

export async function countLessons(params: object, state: State): Promise<number> {
    const lessonsCount = await lessonsCollection.count(params)
    return lessonsCount
}
