
import { Schema, SchemaTypes } from 'mongoose'

import { LmsTableName } from '.'

const locationSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, required: true },
    description: { type: SchemaTypes.String, default: null },
    capacity:    { type: SchemaTypes.Number, default: null },
    color:       { type: SchemaTypes.String, default: '' },
    equipment:  [{ type: SchemaTypes.ObjectId, ref: LmsTableName.locationEquipment }],
})

export { locationSchema }
