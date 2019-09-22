
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const studentSchema = new Schema({
    context:   { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    fullName:  { type: SchemaTypes.String, default: null },
    color:     { type: SchemaTypes.String, default: '' },
})

export { studentSchema }
