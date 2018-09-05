
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import * as db from '../repositories/mongo'
import {
    State,
    User,
    Student,
    UserRole,
} from '../models'
import * as usersServices from './users'

const userToStudent = (user: User): Student => <any>_.pick(user, ['_id', 'access', 'email', 'name', 'firstName', 'lastName'])

export async function getStudents(params: object, state: State): Promise<Student[]> {
    const users = await usersServices.getUsers(
        {
            school: state.school._id,
            roles: UserRole.student,
        },
        state
    )

    return users.map(user => userToStudent(user))
}

export async function getStudentById(studentId: string, state: State): Promise<Student> {
    const user = await usersServices.getUserById(studentId, state)
    return userToStudent(user)
}

export async function createStudent(student: Student, state: State): Promise<Student> {
    const user = await usersServices.createUser(
        _.merge(
            {},
            _.pick(student, ['firstName', 'lastName', 'email']),
            {
                access: null,
                school: state.school._id,
                roles: [UserRole.student],
                defaultActiveRole: UserRole.student,
                name: `${student.firstName} ${student.lastName}`,
            },
        ),
        state
    )

    return userToStudent(user)
}

export async function updateStudentById(studentId: string, student: { firstName: string; lastName: string; }, state: State): Promise<Student> {
    const _student = {
        firstName: student.firstName,
        lastName: student.lastName,
        name: `${student.firstName} ${student.lastName}`,
    }
    const user = await usersServices.updateUserById(studentId, _student, state)
    
    return userToStudent(user)
}
