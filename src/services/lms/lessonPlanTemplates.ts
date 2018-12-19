
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
    LessonPlanTemplate,
} from '../../models'

// export async function getLessonPlanTemplates(params: object, state: State): Promise<LessonPlanTemplate[]> {
//     const lessonPlanTemplates = await db.lessonPlanTemplates.find(params).populate('createdBy').sort({ createdAt: -1 }).lean()
//     return lessonPlanTemplates
// }

// export async function getLessonPlanTemplateById(lessonPlanTemplateId: string, state: State): Promise<LessonPlanTemplate> {
//     const lessonPlanTemplate = await db.lessonPlanTemplates.findById(lessonPlanTemplateId).lean()
//     if (!_.isNil(lessonPlanTemplate)) {
//         return lessonPlanTemplate // .toObject()
//     }
//     throw errors.notFound('LessonPlanTemplate Not Found')
// }

// export async function createLessonPlanTemplate(lessonPlanTemplate: Partial<LessonPlanTemplate>, state: State): Promise<LessonPlanTemplate> {
//     const _lessonPlanTemplate = _.merge(
//         {},
//         { level: [], recomendedAge: [] },
//         _.pick(lessonPlanTemplate, [
//             'level', 'recomendedAge',
//             'title', 'topic', 'focus', 'materials', 'outcome',
//             'isSchoolVisible', 'isCommunityVisible',
//         ]),
//         {
//             school: String(state.school._id),
//             createdAt: moment().toDate(),
//             createdBy: String(state.user._id),
//         }
//     )
//     const createdLessonPlanTemplate = await db.lessonPlanTemplates.create(_lessonPlanTemplate)
//     return createdLessonPlanTemplate.toObject()
// }

// export async function updateLessonPlanTemplateById(lessonPlanTemplateId: string, change: object, state: State): Promise<LessonPlanTemplate> {
//     await db.lessonPlanTemplates.findByIdAndUpdate(lessonPlanTemplateId, change)
//     return getLessonPlanTemplateById(lessonPlanTemplateId, state)
// }
