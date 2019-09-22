
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const courseSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, default: null },
    description: { type: SchemaTypes.String, default: null },
    color:       { type: SchemaTypes.String, default: null },
})

export { courseSchema }
