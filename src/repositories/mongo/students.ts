
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    Student,
} from '../../types'
import { source } from './source'
import { studentSchema, StudentName } from './schemas/student'

const studentsCollection = source.collection<Student>(
    StudentName,
    studentSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}students`
)

export async function getStudents(params: object, state: State): Promise<Student[]> {
    const students = await studentsCollection.find(params)
    return students
        .filter(student => !_.isEmpty(student))
        .map(student => <Student>student)
}

export async function getStudentById(studentId: string, state: State): Promise<Student> {
    const student = await studentsCollection.findById(studentId)
    if (!_.isEmpty(student)) {
        return student
    }
    return null
}

export async function createStudent(document: Student, state: State): Promise<Student> {
    const createdStudent = await studentsCollection.create(document)
    return createdStudent
}
