
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { userSchema } from '../schemas/user'
import {
    UserDocument,
} from '../../../models'

const userModel: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema)

export { userModel }
