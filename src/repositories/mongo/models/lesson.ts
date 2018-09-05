
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { lessonSchema } from '../schemas/lesson'
import {
    LessonDocument,
} from '../../../models'

const lessonModel: Model<LessonDocument> = mongoose.model<LessonDocument>('Lesson', lessonSchema)

export { lessonModel }
