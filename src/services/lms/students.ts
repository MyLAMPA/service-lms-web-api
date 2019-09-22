
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

export const getStudents = async(params: object, state: State): Promise<Student[]> => {
    const students = await studentsRepository.getStudents(params, state)
    return students
}

export const getStudentById = async(studentId: string, state: State): Promise<Student> => {
    const student = await studentsRepository.getStudentById(studentId, state)
    if (student) {
        return student
    }
    throw errors.notFound('Student Not Found')
}

export const createStudent = async(student: Student, email: string, state: State): Promise<Student> => {
    const createdStudent = await studentsRepository.createStudent({ context: state.lmsCtx.contextId, ...student }, state)

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

export const bulkCreateStudents = async(batch: { student: Student; email?: string }[], state: State): Promise<Student[]> => {
    const createdStudents = [] as Student[]
    for (const i in batch) {
        const { student, email } = batch[i]
        try {
            createdStudents.push(await createStudent(student, email, state))
        } catch (err) {
            throw err
        }
    }
    return createdStudents
}
