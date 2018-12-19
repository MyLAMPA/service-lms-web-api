
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'

export const SchoolYearName = 'SchoolYear'

const schoolYearSchema = new Schema({
    school: { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    title:  { type: SchemaTypes.String, default: null },
    start:  { type: SchemaTypes.Date, required: true },
    end:    { type: SchemaTypes.Date, required: true },
})

export { schoolYearSchema }
