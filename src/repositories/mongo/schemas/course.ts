
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'

export const CourseName = 'lms-Course'

const courseSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    color:       { type: SchemaTypes.String, default: '' },
})

export { courseSchema }
