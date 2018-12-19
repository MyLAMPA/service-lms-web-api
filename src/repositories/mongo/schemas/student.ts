
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'

export const StudentName = 'Student'

const studentSchema = new Schema({
    school:    { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    color:     { type: SchemaTypes.String, default: '' },
})

export { studentSchema }
