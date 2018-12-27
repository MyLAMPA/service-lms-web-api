
import { Schema, SchemaTypes } from 'mongoose'

import { ContextName } from './context'

export const SchoolYearName = 'SchoolYear'

const schoolYearSchema = new Schema({
    context: { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    title:   { type: SchemaTypes.String, default: null },
    start:   { type: SchemaTypes.Date, required: true },
    end:     { type: SchemaTypes.Date, required: true },
})

export { schoolYearSchema }
