
import { Schema, SchemaTypes } from 'mongoose'

const locationEquipmentSchema = new Schema({
    school:      { type: SchemaTypes.ObjectId, ref: 'School' },
    title:       { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
})

export { locationEquipmentSchema }
