
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { subscriptionSchema } from '../schemas/subscription'
import {
    SubscriptionDocument,
} from '../../../models'

const subscriptionModel: Model<SubscriptionDocument> = mongoose.model<SubscriptionDocument>('Subscription', subscriptionSchema)

export { subscriptionModel }
