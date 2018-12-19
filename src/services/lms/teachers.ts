
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
} from '../../types'
import {
    Teacher,
} from '../../types/lms'
import {
    SchoolMembershipRole,
} from '../../types/identity'
import { teachersRepository } from '../../repositories'
import * as usersServices from '../identity/users'
import * as schoolMembershipsServices from '../identity/schoolMemberships'

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

export async function createTeacher(teacher: Teacher, email: string, state: State): Promise<Teacher> {
    const createdTeacher = await teachersRepository.createTeacher(teacher, state)

    if (email) {
        const user = await usersServices.getOrCreateUserByEmail(email, state)
        await schoolMembershipsServices.createSchoolMembership({
            school: state.lmsCtx.schoolId,
            role: SchoolMembershipRole.teacher,
            user: user._id,
            teacher: createdTeacher._id,
            student: null,
        }, state)
    }

    return createdTeacher
}
