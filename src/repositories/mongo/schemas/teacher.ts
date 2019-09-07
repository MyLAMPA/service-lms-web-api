
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'

export const TeacherName = 'lms-Teacher'

const teacherSchema = new Schema({
    context:   { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    abbr:      { type: SchemaTypes.String, default: '' },
    color:     { type: SchemaTypes.String, default: '' },
})

export { teacherSchema }
