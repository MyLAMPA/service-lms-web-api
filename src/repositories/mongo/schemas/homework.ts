
import { Schema, SchemaTypes } from 'mongoose'

import { ContextName } from './context'
import { LessonName } from './lesson'

export const HomeworkName = 'Homework'

const homeworkSchema = new Schema({
    context:      { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    dueLesson:    { type: SchemaTypes.ObjectId, ref: LessonName, required: true },
    originLesson: { type: SchemaTypes.ObjectId, ref: LessonName, default: null },
    title:        { type: SchemaTypes.String, default: null },
    assignment:   { type: SchemaTypes.String, default: null },
    isDone:       { type: SchemaTypes.Boolean, default: false },
})

export { homeworkSchema }
