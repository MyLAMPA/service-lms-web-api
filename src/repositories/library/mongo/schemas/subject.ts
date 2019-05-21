
import { Schema, SchemaTypes } from 'mongoose'

export const SubjectName = 'library-Subject'

export const subjectSchema = new Schema({
    childOf:     { type: SchemaTypes.ObjectId, ref: SubjectName, default: null },
    title:       { type: SchemaTypes.String, default: null },
    description: { type: SchemaTypes.String, default: null },
    icon:        { type: SchemaTypes.String, default: null },
})
