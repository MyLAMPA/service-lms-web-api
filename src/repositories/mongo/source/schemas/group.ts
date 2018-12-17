
import { Schema, SchemaTypes } from 'mongoose'

const groupSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: 'School', required: true },
    course:      { type: SchemaTypes.ObjectId, ref: 'Course', default: null },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: '' },
    capacity:    { type: SchemaTypes.Number, default: null },
    students:    [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    color:       { type: SchemaTypes.String, default: '' },
})

export { groupSchema }
