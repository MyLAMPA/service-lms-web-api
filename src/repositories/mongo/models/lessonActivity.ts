
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { lessonActivitySchema } from '../schemas/lessonActivity'
import {
    LessonActivityDocument,
} from '../../../models'

const lessonActivityModel: Model<LessonActivityDocument> = mongoose.model<LessonActivityDocument>('LessonActivity', lessonActivitySchema)

export { lessonActivityModel }
