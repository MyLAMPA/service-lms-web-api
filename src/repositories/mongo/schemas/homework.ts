
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const homeworkSchema = new Schema({
    context:      { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    dueLesson:    { type: SchemaTypes.ObjectId, ref: LmsTableName.lesson, required: true },
    originLesson: { type: SchemaTypes.ObjectId, ref: LmsTableName.lesson, default: null },
    title:        { type: SchemaTypes.String, default: null },
    assignment:   { type: SchemaTypes.String, default: null },
    isDone:       { type: SchemaTypes.Boolean, default: false },
})

export { homeworkSchema }
