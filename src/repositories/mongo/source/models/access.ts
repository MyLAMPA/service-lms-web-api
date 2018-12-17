
import { Model } from 'mongoose'

import { mongoose } from '../../connector'
import { accessSchema } from '../schemas/access'
import {
    AccessDocument,
} from '../../../../models'

const accessModel: Model<AccessDocument> = mongoose.model<AccessDocument>('Access', accessSchema)

export { accessModel }
