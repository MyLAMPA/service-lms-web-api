
import { Schema, SchemaTypes } from 'mongoose'

import { LMSContextName } from './lmsContext'
import { LocationEquipmentName } from './locationEquipment'

export const LocationName = 'lms-Location'

const locationSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LMSContextName, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    capacity:    { type: SchemaTypes.Number, default: null },
    color:       { type: SchemaTypes.String, default: '' },
    equipment:  [{ type: SchemaTypes.ObjectId, ref: LocationEquipmentName }],
})

export { locationSchema }
