
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Teacher,
} from '../../types'
import { source } from './source'
import { LmsTableName } from './schemas'
import { teacherSchema } from './schemas/teacher'

const teachersCollection = source.collection<Teacher>(
    LmsTableName.teacher,
    teacherSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-teachers`
)

export async function getTeachers(params: object, state: State): Promise<Teacher[]> {
    const teachers = await teachersCollection.find(params)
    return teachers
        .filter(teacher => !_.isEmpty(teacher))
        .map(teacher => <Teacher>teacher)
}

export async function getTeacherById(teacherId: string, state: State): Promise<Teacher> {
    const teacher = await teachersCollection.findById(teacherId)
    if (!_.isEmpty(teacher)) {
        return teacher
    }
    return null
}

export async function createTeacher(document: Teacher, state: State): Promise<Teacher> {
    const createdTeacher = await teachersCollection.create(document)
    return createdTeacher
}
