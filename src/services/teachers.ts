
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import * as db from '../repositories/mongo'
import {
    State,
    User,
    Teacher,
    UserRole,
} from '../models'
import * as usersServices from './users'

const userToTeacher = (user: User): Teacher => <any>_.pick(user, ['_id', 'access', 'email', 'name', 'firstName', 'lastName', 'abbr', 'color'])

export async function getTeachers(params: object, state: State): Promise<Teacher[]> {
    const users = await usersServices.getUsers(
        {
            school: state.school._id,
            roles: UserRole.teacher,
        },
        state
    )

    return users.map(userToTeacher)
}

export async function getTeacherById(teacherId: string, state: State): Promise<Teacher> {
    const user = await usersServices.getUserById(teacherId, state)    
    return userToTeacher(user)
}

export async function createTeacher(teacher: Teacher, state: State): Promise<Teacher> {
    const user = await usersServices.createUser(
        _.merge(
            {},
            _.pick(teacher, ['firstName', 'lastName', 'abbr', 'email', 'color']),
            {
                access: null,
                school: state.school._id,
                roles: [UserRole.teacher],
                defaultActiveRole: UserRole.teacher,
                name: `${teacher.firstName} ${teacher.lastName}`,
            },
        ),
        state
    )

    return userToTeacher(user)
}

export async function updateTeacherById(teacherId: string, teacher: Teacher, state: State): Promise<Teacher> {
    const fields: any = _.pick(teacher, ['firstName', 'lastName', 'abbr', 'color'])
    fields.name = `${fields.firstName} ${fields.lastName}`
    const user = await usersServices.updateUserById(teacherId, fields, state)
    
    return userToTeacher(user)
}
