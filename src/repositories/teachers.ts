
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
} from '../models'
import {
    Teacher,
} from '../types/lms'
import * as source from './mongo/source'

export async function getTeachers(params: object, state: State): Promise<Teacher[]> {
    const teachers = await source.teachers.find(params)
    return teachers
        .filter(teacher => !_.isEmpty(teacher))
        .map(teacher => <Teacher>teacher)
}

export async function getTeacherById(teacherId: string, state: State): Promise<Teacher> {
    const teacher = await source.teachers.findById(teacherId)
    if (!_.isEmpty(teacher)) {
        return teacher
    }
    return null
}
