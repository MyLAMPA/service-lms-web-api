
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { schoolYearSchema } from '../schemas/schoolYear'
import {
    SchoolYearDocument,
} from '../../../models'

const schoolYearModel: Model<SchoolYearDocument> = mongoose.model<SchoolYearDocument>('SchoolYear', schoolYearSchema)

export { schoolYearModel }
