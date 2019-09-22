
import { Schema, SchemaTypes } from 'mongoose'
import * as mongoosastic from 'mongoosastic'

import { client as esClient } from '../../../../components/elasticsearch'
import { elasticEntityType } from '../../../../enums'

export const ActivityName = 'library-Activity'

const documentSchema = {
    json: { type: SchemaTypes.String },
    text: { type: SchemaTypes.String, default: null },
}

const activitySchema = new Schema({
    createdAt:    { type: SchemaTypes.Date, default: null, es_indexed: true },
    createdBy:    { type: SchemaTypes.Number, default: null, es_indexed: true },
    slug:         { type: SchemaTypes.String, default: null, es_indexed: true },
    privacyPolicy: {
        isPublic: { type: SchemaTypes.Boolean, default: true },
    },
    title:        { type: SchemaTypes.String, default: null, es_indexed: true, es_type: 'string', es_boost: 2.0 },
    description:  { type: SchemaTypes.String, default: null, es_indexed: true, es_type: 'string', es_boost: 1.0 },
    procedure:    documentSchema,
    duration:     { type: SchemaTypes.Number, default: null, es_indexed: true },
    isRepeatable: { type: SchemaTypes.Boolean, default: true, es_indexed: true },
    level:       [{ type: SchemaTypes.String, es_indexed: true, es_boost: 3.0 }],
    skill:       [{ type: SchemaTypes.String, es_indexed: true, es_boost: 3.0 }],
    type:        [{ type: SchemaTypes.String, es_indexed: true, es_boost: 3.0 }],
    topic:       [{ type: SchemaTypes.String, es_indexed: true, es_boost: 3.0 }],

    tags:        [{
        key:  { type: SchemaTypes.String, required: true },
        name: { type: SchemaTypes.String },
        text: { type: SchemaTypes.String, es_indexed: true, es_type: 'string', es_boost: 3.0 },
    }],
})

activitySchema.plugin(mongoosastic, {
    esClient,
    type: elasticEntityType.activity,
    hydrate: false,
})

export { activitySchema }
