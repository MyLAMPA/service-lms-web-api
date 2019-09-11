
import { Schema, SchemaTypes } from 'mongoose'

import {
    LmsContextMembershipRole,
} from '../../../types'
import { LmsTableName } from '.'

const lmsContextMembershipRoleEnum = [
    LmsContextMembershipRole.freelancer,
    LmsContextMembershipRole.student,
    LmsContextMembershipRole.teacher,
    LmsContextMembershipRole.admin,
]

const lmsContextMembershipSchema = new Schema({
    isActive:     { type: SchemaTypes.Boolean, default: true },
    emailAddress: { type: SchemaTypes.String, required: true },
    // userId:      { type: SchemaTypes.Number, required: true },
    role:         { type: SchemaTypes.String, enum: lmsContextMembershipRoleEnum, required: true },
    lmsContext:   { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    student:      { type: SchemaTypes.ObjectId, ref: LmsTableName.student, default: null },
    teacher:      { type: SchemaTypes.ObjectId, ref: LmsTableName.teacher, default: null },
})

export { lmsContextMembershipSchema }
