
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { courseSchema } from '../schemas/course'
import {
    CourseDocument,
} from '../../../models'

const courseModel: Model<CourseDocument> = mongoose.model<CourseDocument>('Course', courseSchema)

export { courseModel }
