
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { schoolSchema } from '../schemas/school'
import {
    SchoolDocument,
} from '../../../models'

const schoolModel: Model<SchoolDocument> = mongoose.model<SchoolDocument>('School', schoolSchema)

export { schoolModel }
