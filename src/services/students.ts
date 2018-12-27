
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Student,
    ContextMembershipRole,
} from '../types'
import { studentsRepository } from '../repositories'
import * as usersServices from './users'
import * as contextMembershipsServices from './contextMemberships'

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

export async function createStudent(student: Student, email: string, state: State): Promise<Student> {
    const createdStudent = await studentsRepository.createStudent(student, state)

    if (email) {
        const user = await usersServices.getOrCreateUserByEmail(email, state)
        await contextMembershipsServices.createSchoolMembership({
            context: state.lmsCtx.contextId,
            role: ContextMembershipRole.student,
            userId: user.id,
            teacher: null,
            student: createdStudent._id,
        }, state)
    }

    return createdStudent
}
