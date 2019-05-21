
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'

export const StudentName = 'Student'

const studentSchema = new Schema({
    context:   { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    color:     { type: SchemaTypes.String, default: '' },
})

export { studentSchema }
