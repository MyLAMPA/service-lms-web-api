
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { groupSchema } from '../schemas/group'
import {
    GroupDocument,
} from '../../../models'

const groupModel: Model<GroupDocument> = mongoose.model<GroupDocument>('Group', groupSchema)

export { groupModel }
