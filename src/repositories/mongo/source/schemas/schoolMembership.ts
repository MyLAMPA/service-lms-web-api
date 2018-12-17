
import { Schema, SchemaTypes } from 'mongoose'

import {
    SchoolMembershipRole,
} from '../../../../types/user'

const schoolMembershipRoleEnum = [
    SchoolMembershipRole.student,
    SchoolMembershipRole.teacher,
    SchoolMembershipRole.admin,
]

const schoolMembershipSchema = new Schema({
    isActive: { type: SchemaTypes.Boolean, default: true },
    user:     { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    school:   { type: SchemaTypes.ObjectId, ref: 'School', required: true },
    role:     { type: SchemaTypes.String, enum: schoolMembershipRoleEnum, required: true },
    student:  { type: SchemaTypes.ObjectId, ref: 'Student', default: null },
    teacher:  { type: SchemaTypes.ObjectId, ref: 'Teacher', default: null },
})

export { schoolMembershipSchema }
