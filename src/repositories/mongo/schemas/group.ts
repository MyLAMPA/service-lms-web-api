
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'
import { CourseName } from './course'
import { StudentName } from './student'

export const GroupName = 'Group'

const groupSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    course:      { type: SchemaTypes.ObjectId, ref: CourseName, default: null },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: '' },
    capacity:    { type: SchemaTypes.Number, default: null },
    students:   [{ type: SchemaTypes.ObjectId, ref: StudentName }],
    color:       { type: SchemaTypes.String, default: '' },
})

export { groupSchema }
