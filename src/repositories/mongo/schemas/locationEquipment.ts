
import { Schema, SchemaTypes } from 'mongoose'

import { ContextName } from './context'

export const LocationEquipmentName = 'LocationEquipment'

const locationEquipmentSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: ContextName, required: true },
    title:       { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
})

export { locationEquipmentSchema }
