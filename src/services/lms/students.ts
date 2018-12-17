
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../models'
import {
    Student,
} from '../../types/lms'
import { studentsRepository } from '../../repositories'

export async function getStudents(params: object, state: State): Promise<Student[]> {
    const students = await studentsRepository.getStudents(params, state)
    return students
}

export async function getStudentById(studentId: string, state: State): Promise<Student> {
    const student = await studentsRepository.getStudentById(studentId, state)
    if (student) {
        return student
    }
    throw errors.notFound('Student Not Found')
}
