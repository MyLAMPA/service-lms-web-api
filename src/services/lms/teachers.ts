
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
    Teacher,
    LmsContextMembershipRole,
} from '../../types'
import { teachersRepository } from '../../repositories'
import * as lmsContextMembershipsServices from './lmsContextMemberships'
import * as emailAddressesServices from '../emailAddresses'

export const getTeachers = async(params: object, state: State): Promise<Teacher[]> => {
    const teachers = await teachersRepository.getTeachers(params, state)
    return teachers
}

export const getTeacherById = async(teacherId: string, state: State): Promise<Teacher> => {
    const teacher = await teachersRepository.getTeacherById(teacherId, state)
    if (teacher) {
        return teacher
    }
    throw errors.notFound('Teacher Not Found')
}

export const createTeacher = async(teacher: Teacher, email: string, state: State): Promise<Teacher> => {
    const createdTeacher = await teachersRepository.createTeacher({ context: state.lmsCtx.contextId, ...teacher }, state)

    if (email) {
        const { id: emailAddressId } = await emailAddressesServices.getOrCreateByEmail(email, state)
        await lmsContextMembershipsServices.createLMSContextMembership({
            lmsContext: state.lmsCtx.contextId,
            role: LmsContextMembershipRole.teacher,
            emailAddress: emailAddressId,
            teacher: createdTeacher._id,
            student: null,
        }, state)
    }

    return createdTeacher
}

export const bulkCreateTeachers = async(batch: { teacher: Teacher; email?: string; }[], state: State): Promise<Teacher[]> => {
    const createdTeachers = [] as Teacher[]
    for (const i in batch) {
        const { teacher, email } = batch[i]
        try {
            createdTeachers.push(await createTeacher(teacher, email, state))
        } catch (err) {
            throw err
        }
    }
    return createdTeachers
}
