
import { Schema, SchemaTypes } from 'mongoose'

import {
    LMSContextMembershipRole,
} from '../../../types'
import { LMSContextName } from './lmsContext'
import { StudentName } from './student'
import { TeacherName } from './teacher'

export const LMSContextMembershipName = 'lms-LMSContextMembership'

const lmsContextMembershipRoleEnum = [
    LMSContextMembershipRole.freelancer,
    LMSContextMembershipRole.student,
    LMSContextMembershipRole.teacher,
    LMSContextMembershipRole.admin,
]

const lmsContextMembershipSchema = new Schema({
    isActive:     { type: SchemaTypes.Boolean, default: true },
    emailAddress: { type: SchemaTypes.String, required: true },
    // userId:      { type: SchemaTypes.Number, required: true },
    role:         { type: SchemaTypes.String, enum: lmsContextMembershipRoleEnum, required: true },
    lmsContext:   { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    student:      { type: SchemaTypes.ObjectId, ref: StudentName, default: null },
    teacher:      { type: SchemaTypes.ObjectId, ref: TeacherName, default: null },
})

export { lmsContextMembershipSchema }
