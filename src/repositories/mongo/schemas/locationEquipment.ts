
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const locationEquipmentSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    title:       { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
})

export { locationEquipmentSchema }
