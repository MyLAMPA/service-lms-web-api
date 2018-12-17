
import { Model, Document } from 'mongoose'

import { mongoose } from '../../connector'
import { teacherSchema } from '../schemas/teacher'
import {
    Teacher,
} from '../../../../types/lms'

const teacherModel: Model<Teacher&Document> = mongoose.model<Teacher&Document>('Teacher', teacherSchema)

export { teacherModel }
