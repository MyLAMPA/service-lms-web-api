
import { Schema, SchemaTypes } from 'mongoose'

const locationSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: 'School', required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    capacity:    { type: SchemaTypes.Number, default: null },
    color:       { type: SchemaTypes.String, default: '' },
    equipment:   [{ type: SchemaTypes.ObjectId, ref: 'LocationEquipment' }],
})

export { locationSchema }
