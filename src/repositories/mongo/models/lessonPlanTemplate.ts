
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { lessonPlanTemplateSchema } from '../schemas/lessonPlanTemplate'
import {
    LessonPlanTemplateDocument,
} from '../../../models'

const lessonPlanTemplateModel: Model<LessonPlanTemplateDocument> = mongoose.model<LessonPlanTemplateDocument>('LessonPlanTemplate', lessonPlanTemplateSchema)

export { lessonPlanTemplateModel }
