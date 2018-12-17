
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    State,
} from '../models'
import {
    Student,
} from '../types/lms'
import * as source from './mongo/source'

export async function getStudents(params: object, state: State): Promise<Student[]> {
    const students = await source.students.find(params)
    return students
        .filter(student => !_.isEmpty(student))
        .map(student => <Student>student)
}

export async function getStudentById(studentId: string, state: State): Promise<Student> {
    const student = await source.students.findById(studentId)
    if (!_.isEmpty(student)) {
        return student
    }
    return null
}
