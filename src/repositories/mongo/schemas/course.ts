
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'

export const CourseName = 'Course'

const courseSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    color:       { type: SchemaTypes.String, default: '' },
})

export { courseSchema }
