
import { Schema, SchemaTypes } from 'mongoose'

import { SchoolName } from './school'
import { LocationEquipmentName } from './locationEquipment'

export const LocationName = 'Location'

const locationSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: SchoolName, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    capacity:    { type: SchemaTypes.Number, default: null },
    color:       { type: SchemaTypes.String, default: '' },
    equipment:  [{ type: SchemaTypes.ObjectId, ref: LocationEquipmentName }],
})

export { locationSchema }
