
import { Model, Document } from 'mongoose'

import { mongoose } from '../../connector'
import { schoolMembershipSchema } from '../schemas/schoolMembership'
import {
    SchoolMembership,
} from '../../../../types/user'

const schoolMembershipModel: Model<SchoolMembership&Document> = mongoose.model<SchoolMembership&Document>('SchoolMembership', schoolMembershipSchema)

export { schoolMembershipModel }
