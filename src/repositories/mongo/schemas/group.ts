
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const groupSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    course:      { type: SchemaTypes.ObjectId, ref: LmsTableName.course, default: null },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: '' },
    capacity:    { type: SchemaTypes.Number, default: null },
    students:   [{ type: SchemaTypes.ObjectId, ref: LmsTableName.student }],
    color:       { type: SchemaTypes.String, default: '' },
})

export { groupSchema }
