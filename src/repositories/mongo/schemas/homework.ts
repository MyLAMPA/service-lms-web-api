
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'
import { LessonName } from './lesson'

export const HomeworkName = 'Homework'

const homeworkSchema = new Schema({
    context:      { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    dueLesson:    { type: SchemaTypes.ObjectId, ref: LessonName, required: true },
    originLesson: { type: SchemaTypes.ObjectId, ref: LessonName, default: null },
    title:        { type: SchemaTypes.String, default: null },
    assignment:   { type: SchemaTypes.String, default: null },
    isDone:       { type: SchemaTypes.Boolean, default: false },
})

export { homeworkSchema }
