
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'

export const SchoolYearName = 'lms-SchoolYear'

const schoolYearSchema = new Schema({
    context: { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    title:   { type: SchemaTypes.String, default: null },
    start:   { type: SchemaTypes.Date, required: true },
    end:     { type: SchemaTypes.Date, required: true },
})

export { schoolYearSchema }
