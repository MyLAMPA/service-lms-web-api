
import { Schema, SchemaTypes } from 'mongoose'

// import {} from '../../../../types/library'

export const ActivityName = 'library-Activity'

export const activitySchema = new Schema({
    createdAt:    { type: SchemaTypes.Date, default: null },
    createdBy:    { type: SchemaTypes.Number, default: null },
    privacyPolicy: {
        isPublic: { type: SchemaTypes.Boolean, default: true },
    },
    title:        { type: SchemaTypes.String, default: null },
    procedure:    { type: SchemaTypes.String, default: null },
    isRepeatable: { type: SchemaTypes.Boolean, default: true },
    tags:        [{
        key:  { type: SchemaTypes.String, required: true },
        name: { type: SchemaTypes.String },
        text: { type: SchemaTypes.String },
    }],
})
