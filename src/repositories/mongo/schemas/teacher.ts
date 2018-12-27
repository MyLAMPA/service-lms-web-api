
import { Schema, SchemaTypes } from 'mongoose'

import { ContextName } from './context'

export const TeacherName = 'Teacher'

const teacherSchema = new Schema({
    context:   { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    abbr:      { type: SchemaTypes.String, default: '' },
    color:     { type: SchemaTypes.String, default: '' },
})

export { teacherSchema }
