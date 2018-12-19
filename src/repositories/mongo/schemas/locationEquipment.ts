
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'

export const LocationEquipmentName = 'LocationEquipment'

const locationEquipmentSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    title:       { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
})

export { locationEquipmentSchema }
