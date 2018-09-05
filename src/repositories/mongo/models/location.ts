
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { locationSchema } from '../schemas/location'
import {
    LocationDocument,
} from '../../../models'

const locationModel: Model<LocationDocument> = mongoose.model<LocationDocument>('Location', locationSchema)

export { locationModel }
