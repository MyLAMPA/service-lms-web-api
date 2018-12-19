
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
} from '../../models'
import {
    Teacher,
} from '../../types/lms'
import { source } from './source'
import { teacherSchema, TeacherName } from './schemas/teacher'

const teachersCollection = source.collection<Teacher>(
    TeacherName,
    teacherSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}teachers`
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
