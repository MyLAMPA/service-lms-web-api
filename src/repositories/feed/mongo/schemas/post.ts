
import { Schema, SchemaTypes } from 'mongoose'
import * as mongoosastic from 'mongoosastic'

import { client as esClient } from '../../../../components/elasticsearch'
import { elasticEntityType } from '../../../../enums'

export const PostName = 'feed-Post'

const postSchema = new Schema({
    createdAt:    { type: SchemaTypes.Date, default: null },
    createdBy:    { type: SchemaTypes.Number, default: null },
    content:      { type: SchemaTypes.String, default: null },
    title:        { type: SchemaTypes.String, default: null, es_indexed: true, es_type: 'string', es_boost: 2.0 },
})

postSchema.plugin(mongoosastic, {
    esClient,
    type: elasticEntityType.post,
    hydrate: false,
})

export { postSchema }
