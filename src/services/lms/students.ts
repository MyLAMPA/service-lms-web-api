
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
    Student,
    LmsContextMembershipRole,
} from '../../types'
import { studentsRepository } from '../../repositories'
import * as lmsContextMembershipsServices from './lmsContextMemberships'
import * as emailAddressesServices from '../emailAddresses'

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
        const { id: emailAddressId } = await emailAddressesServices.getOrCreateByEmail(email, state)
        await lmsContextMembershipsServices.createLMSContextMembership({
            lmsContext: state.lmsCtx.contextId,
            role: LmsContextMembershipRole.student,
            emailAddress: emailAddressId,
            teacher: null,
            student: createdStudent._id,
        }, state)
    }

    return createdStudent
}
