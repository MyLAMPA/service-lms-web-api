
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { clientSchema } from '../schemas/client'
import {
    ClientDocument,
} from '../../../models'

const clientModel: Model<ClientDocument> = mongoose.model<ClientDocument>('Client', clientSchema)

export { clientModel }
