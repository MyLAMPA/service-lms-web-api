
import { Schema, SchemaTypes } from 'mongoose'

import {
    UserRole,
} from '../../../models'

const userSchema = new Schema({
    access:            { type: SchemaTypes.ObjectId, ref: 'Access', default: null },
    school:            { type: SchemaTypes.ObjectId, ref: 'School', required: true },
    roles:             [{ type: SchemaTypes.String, enum: [UserRole.admin, UserRole.teacher, UserRole.student] }],
    defaultActiveRole: { type: SchemaTypes.String, enum: [UserRole.admin, UserRole.teacher, UserRole.student], default: null },
    email:             { type: SchemaTypes.String, default: null },
    name:              { type: SchemaTypes.String, default: '' },
    firstName:         { type: SchemaTypes.String, default: '' },
    lastName:          { type: SchemaTypes.String, default: '' },
    abbr:              { type: SchemaTypes.String, default: null },
    color:             { type: SchemaTypes.String, default: null },
})

export { userSchema }
