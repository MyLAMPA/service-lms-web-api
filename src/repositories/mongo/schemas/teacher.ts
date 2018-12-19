
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'

export const TeacherName = 'Teacher'

const teacherSchema = new Schema({
    school:    { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    abbr:      { type: SchemaTypes.String, default: '' },
    color:     { type: SchemaTypes.String, default: '' },
})

export { teacherSchema }
