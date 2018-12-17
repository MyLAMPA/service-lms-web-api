
import { Model } from 'mongoose'

import { mongoose } from '../../connector'
import { homeworkSchema } from '../schemas/homework'
import {
    HomeworkDocument,
} from '../../../../models'

const homeworkModel: Model<HomeworkDocument> = mongoose.model<HomeworkDocument>('Homework', homeworkSchema)

export { homeworkModel }
