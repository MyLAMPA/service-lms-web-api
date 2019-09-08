
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const teacherSchema = new Schema({
    context:   { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    abbr:      { type: SchemaTypes.String, default: '' },
    color:     { type: SchemaTypes.String, default: '' },
})

export { teacherSchema }
