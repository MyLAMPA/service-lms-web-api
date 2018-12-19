
import * as _ from 'lodash'
import * as moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { httpErrors as errors, httpErrors } from '../../errors'
// import * as db from '../repositories/mongo'
// import * as lessonsServices from './lessons'
// import * as outcomesServices from './outcomes'

// export async function getLessonPlan(lessonId: string, state: State): Promise<BaseLessonPlan> {
//     const lesson = await db.lessons.findById(lessonId).lean()
//     if (!_.isNil(lesson)) {
//         return lesson.lessonPlan
//     }
//     throw errors.notFound('Lesson Not Found')
// }

// export async function updateLessonPlan(lessonId: string, lessonPlan: Partial<BaseLessonPlan>, state: State): Promise<BaseLessonPlan> {
//     await db.lessons.findByIdAndUpdate(lessonId, { $set: { lessonPlan } })
//     const lesson = await lessonsServices.getLessonById(lessonId, state)
//     return lesson.lessonPlan
// }

// export async function mergeOutcomeToLessonPlan(lessonId: string, outcome: BaseOutcome, state: State): Promise<BaseLessonPlan>
// export async function mergeOutcomeToLessonPlan(lessonId: string, outcome: BaseOutcome[], state: State): Promise<BaseLessonPlan>
// export async function mergeOutcomeToLessonPlan(lessonId: string, outcomeOrOutcomes: BaseOutcome|BaseOutcome[], state: State): Promise<BaseLessonPlan> {
//     const _input: BaseOutcome[] = _.isArray(outcomeOrOutcomes) ? outcomeOrOutcomes : [outcomeOrOutcomes]
// 
//     const lessonPlan = await getLessonPlan(lessonId, state)
//     const outcomeKeys = _.union(_.map(lessonPlan.outcomes, outcome => outcome.key))
// 
//     for (const i in _input) {
//         const outcome = _input[i]
// 
//         if (outcomeKeys.indexOf(outcome.key) < 0) {
//             const _outcome = await outcomesServices.prepareForSave(outcome, state)
//             await db.lessons.findByIdAndUpdate(lessonId, { $push: { 'lessonPlan.outcomes': [_outcome] } })
//         }
//     }
// 
//     const lesson = await lessonsServices.getLessonById(lessonId, state)
//     return lesson.lessonPlan
// }

// export async function createLessonPlanOutcome(lessonId: string, outcome: Partial<BaseOutcome>, state: State): Promise<BaseOutcome[]> {
//     const lesson = await db.lessons.findById(lessonId)
//     const _outcome: BaseOutcome = {
//         key: uuidv4(),
//         createdBy: state.user._id,
//         content: outcome.content,
//         parentLessonPlanTemplate: outcome.parentLessonPlanTemplate,
//         parentActivity: outcome.parentActivity,
//     }
//     if (_.isArray(lesson.lessonPlan.outcomes) && lesson.lessonPlan.outcomes.length > 0) {
//         await db.lessons.findByIdAndUpdate(lessonId, { $push: { 'lessonPlan.outcomes': [_outcome] } })
//     } else {
//         await db.lessons.findByIdAndUpdate(lessonId, { $set: { 'lessonPlan.outcomes': [_outcome] } })
//     }
//     const updatedLesson = await db.lessons.findById(lessonId)
//     return updatedLesson.lessonPlan.outcomes
// }

// export async function deleteLessonPlanOutcome(lessonId: string, outcomeKey: string, state: State): Promise<BaseOutcome[]> {
//     const lesson = await db.lessons.findById(lessonId)
//     const outcomes = (lesson.lessonPlan.outcomes || []).filter(outcome => outcome.key !== outcomeKey)
//     await db.lessons.findByIdAndUpdate(lessonId, { $set: { 'lessonPlan.outcomes': outcomes } })
//     const updatedLesson = await db.lessons.findById(lessonId)
//     return updatedLesson.lessonPlan.outcomes
// }
