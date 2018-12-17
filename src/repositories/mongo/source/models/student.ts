
import { Model, Document } from 'mongoose'

import { mongoose } from '../../connector'
import { studentSchema } from '../schemas/student'
import {
    Student,
} from '../../../../types/lms'

const studentModel: Model<Student&Document> = mongoose.model<Student&Document>('Student', studentSchema)

export { studentModel }
