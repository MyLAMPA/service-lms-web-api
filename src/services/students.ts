
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
    Student,
} from '../models'

export async function getStudents(params: object, state: State): Promise<Student[]> {
    throw errors.serverError('deprached api')
}

export async function getStudentById(studentId: string, state: State): Promise<Student> {
    throw errors.serverError('deprached api')
}

export async function createStudent(student: Student, state: State): Promise<Student> {
    throw errors.serverError('deprached api')
}

export async function updateStudentById(studentId: string, student: { firstName: string; lastName: string; }, state: State): Promise<Student> {
    throw errors.serverError('deprached api')
}
