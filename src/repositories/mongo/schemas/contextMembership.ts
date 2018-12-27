
import { Schema, SchemaTypes } from 'mongoose'

import {
    ContextMembershipRole,
} from '../../../types'
import { ContextName } from './context'
import { StudentName } from './student'
import { TeacherName } from './teacher'

export const ContextMembershipName = 'ContextMembership'

const contextMembershipRoleEnum = [
    ContextMembershipRole.student,
    ContextMembershipRole.teacher,
    ContextMembershipRole.admin,
]

const contextMembershipSchema = new Schema({
    isActive: { type: SchemaTypes.Boolean, default: true },
    userId:   { type: SchemaTypes.Number, required: true },
    role:     { type: SchemaTypes.String, enum: contextMembershipRoleEnum, required: true },
    context:  { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    student:  { type: SchemaTypes.ObjectId, ref: StudentName, default: null },
    teacher:  { type: SchemaTypes.ObjectId, ref: TeacherName, default: null },
})

export { contextMembershipSchema }
