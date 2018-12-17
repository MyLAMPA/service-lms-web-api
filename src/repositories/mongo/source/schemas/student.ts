
import { Schema, SchemaTypes } from 'mongoose'

const studentSchema = new Schema({
    school:    { type: SchemaTypes.ObjectId, ref: 'School', required: true },
    firstName: { type: SchemaTypes.String, default: null },
    lastName:  { type: SchemaTypes.String, default: null },
    color:     { type: SchemaTypes.String, default: '' },
})

export { studentSchema }
