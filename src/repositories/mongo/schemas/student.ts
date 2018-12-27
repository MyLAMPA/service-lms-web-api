
import { Schema, SchemaTypes } from 'mongoose'

import { ContextName } from './context'

export const StudentName = 'Student'

const studentSchema = new Schema({
    context:   { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    color:     { type: SchemaTypes.String, default: '' },
})

export { studentSchema }
