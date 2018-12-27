
import { Schema, SchemaTypes } from 'mongoose'

import { ContextName } from './context'

export const CourseName = 'Course'

const courseSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    color:       { type: SchemaTypes.String, default: '' },
})

export { courseSchema }
