
import { Schema, SchemaTypes } from 'mongoose'

const homeworkSchema = new Schema({
    school:       { type: SchemaTypes.ObjectId, ref: 'School', required: true },
    dueLesson:    { type: SchemaTypes.ObjectId, ref: 'Lesson', required: true },
    originLesson: { type: SchemaTypes.ObjectId, ref: 'Lesson', default: null },
    title:        { type: SchemaTypes.String, default: null },
    assignment:   { type: SchemaTypes.String, default: null },
    isDone:       { type: SchemaTypes.Boolean, default: false },
})

export { homeworkSchema }
