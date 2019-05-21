
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'

export const LocationEquipmentName = 'LocationEquipment'

const locationEquipmentSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    title:       { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
})

export { locationEquipmentSchema }
