
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const schoolYearSchema = new Schema({
    context: { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    title:   { type: SchemaTypes.String, default: null },
    start:   { type: SchemaTypes.Date, required: true },
    end:     { type: SchemaTypes.Date, required: true },
})

export { schoolYearSchema }
