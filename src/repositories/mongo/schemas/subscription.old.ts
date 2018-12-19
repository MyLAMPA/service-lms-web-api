
import { Schema, SchemaTypes } from 'mongoose'

import {
    SubscriptionTier,
    SubscriptionType,
} from '../../../models'

const subscriptionSchema = new Schema({
    type:                 { type: SchemaTypes.String, enum: [SubscriptionType.school, SubscriptionType.teacher, SubscriptionType.student], required: true },
    tier:                 { type: SchemaTypes.String, enum: [SubscriptionTier.tier1], default: SubscriptionTier.tier1 },
    expirationDate:       { type: SchemaTypes.Date, required: true },
    purchaseDate:         { type: SchemaTypes.Date, required: true },
    originalPurchaseDate: { type: SchemaTypes.Date, required: true },
})

export { subscriptionSchema }
