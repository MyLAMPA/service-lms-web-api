
import { Schema, SchemaTypes } from 'mongoose'
import * as mongoosastic from 'mongoosastic'

import { client as esClient } from '../../../components/elasticsearch'
import { elasticEntityType } from '../../../enums'

const fileSchema = {
    key:     { type: SchemaTypes.String, default: null },
    fileKey: { type: SchemaTypes.String, required: true, es_indexed: true, es_type: 'string' },
}

const imageSchema = new Schema({
    createdAt:    { type: SchemaTypes.Date, default: null },
    createdBy:    { type: SchemaTypes.Number, default: null },
    file:         fileSchema,
    title:        { type: SchemaTypes.String, default: null, es_indexed: true, es_type: 'string', es_boost: 2.0 },
    description:  { type: SchemaTypes.String, default: null, es_indexed: true, es_type: 'string' },
    tags:        [{
        key:  { type: SchemaTypes.String, required: true },
        name: { type: SchemaTypes.String },
        text: { type: SchemaTypes.String, es_indexed: true, es_type: 'string', es_boost: 3.0 },
    }],
})

imageSchema.plugin(mongoosastic, {
    esClient,
    type: elasticEntityType.image,
    hydrate: false,
})

export { imageSchema }
