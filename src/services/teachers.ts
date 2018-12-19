
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    Teacher,
} from '../models'

export async function getTeachers(params: object, state: State): Promise<Teacher[]> {
    throw errors.serverError('deprached api')
}

export async function getTeacherById(teacherId: string, state: State): Promise<Teacher> {
    throw errors.serverError('deprached api')
}

export async function createTeacher(teacher: Teacher, state: State): Promise<Teacher> {
    throw errors.serverError('deprached api')
}

export async function updateTeacherById(teacherId: string, teacher: Teacher, state: State): Promise<Teacher> {
    throw errors.serverError('deprached api')
}
