
import { Schema, SchemaTypes } from 'mongoose'

import {
    SchoolMembershipRole,
} from '../../../types/user'
import { SchoolName } from './school'
import { UserName } from './user'
import { StudentName } from './student'
import { TeacherName } from './teacher'

export const SchoolMembershipName = 'SchoolMembership'

const schoolMembershipRoleEnum = [
    SchoolMembershipRole.student,
    SchoolMembershipRole.teacher,
    SchoolMembershipRole.admin,
]

const schoolMembershipSchema = new Schema({
    isActive: { type: SchemaTypes.Boolean, default: true },
    user:     { type: SchemaTypes.ObjectId, ref: UserName, required: true },
    school:   { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    role:     { type: SchemaTypes.String, enum: schoolMembershipRoleEnum, required: true },
    student:  { type: SchemaTypes.ObjectId, ref: StudentName, default: null },
    teacher:  { type: SchemaTypes.ObjectId, ref: TeacherName, default: null },
})

export { schoolMembershipSchema }
