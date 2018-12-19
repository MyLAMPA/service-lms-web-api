
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    LessonPlanTemplate,
} from '../models'

export async function getLessonPlanTemplates(params: object, state: State): Promise<LessonPlanTemplate[]> {
    throw errors.serverError('deprached api')
}

export async function getLessonPlanTemplateById(lessonPlanTemplateId: string, state: State): Promise<LessonPlanTemplate> {
    throw errors.serverError('deprached api')
}

export async function createLessonPlanTemplate(lessonPlanTemplate: Partial<LessonPlanTemplate>, state: State): Promise<LessonPlanTemplate> {
    throw errors.serverError('deprached api')
}

export async function updateLessonPlanTemplateById(lessonPlanTemplateId: string, change: object, state: State): Promise<LessonPlanTemplate> {
    throw errors.serverError('deprached api')
}
