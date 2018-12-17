
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../models'
import {
    Teacher,
} from '../../types/lms'
import { teachersRepository } from '../../repositories'

export async function getTeachers(params: object, state: State): Promise<Teacher[]> {
    const teachers = await teachersRepository.getTeachers(params, state)
    return teachers
}

export async function getTeacherById(teacherId: string, state: State): Promise<Teacher> {
    const teacher = await teachersRepository.getTeacherById(teacherId, state)
    if (teacher) {
        return teacher
    }
    throw errors.notFound('Teacher Not Found')
}
