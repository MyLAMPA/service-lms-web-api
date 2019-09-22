
import { Schema, SchemaTypes } from 'mongoose'

import { LocationType } from '../../../types'
import { LmsTableName } from '.'

const locationTypeEnum = [
    null, // keep because of the FUCKING MOngoose
    LocationType.classroom, LocationType.remote,
    LocationType.online, LocationType.other,
]

const locationSchema = new Schema({
    context:     { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, required: true },
    type:        { type: SchemaTypes.String, enum: locationTypeEnum, default: null },
    name:        { type: SchemaTypes.String, required: true },
    abbr:        { type: SchemaTypes.String, default: null },
    description: { type: SchemaTypes.String, default: null },
    capacity:    { type: SchemaTypes.Number, default: null },
    color:       { type: SchemaTypes.String, default: null },
    equipment:  [{ type: SchemaTypes.ObjectId, ref: LmsTableName.locationEquipment }],
})

export { locationSchema }
