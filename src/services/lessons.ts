
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Lesson,
    LessonStatus,
} from '../types'
import { lessonsRepository } from '../repositories'

async function getLessonsQuery(params: object, state: State): Promise<object> {
    const query = {}
    // TODO: Implement function; wait.. how's that it's working right now??
    return query
}

export async function getLessons(params: object, state: State): Promise<Lesson[]> {
    const lessons = lessonsRepository.getLessons(params, state)
    return lessons
}

export async function getOneLesson(params: object, sort: object, state: State): Promise<Lesson> {
    const lesson = await lessonsRepository.getOneLesson(params, state)
    return lesson
}

export async function countLessons(params: object, state: State): Promise<number> {
    const query = await getLessonsQuery(params, state)
    const lesson = await lessonsRepository.countLessons(query, state)
    return lesson
}

export async function getLessonById(lessonId: string, state: State): Promise<Lesson> {
    const lesson = await lessonsRepository.getLessonById(lessonId, state)
    if (lesson) {
        return lesson
    }
    throw errors.notFound('Lesson Not Found')
}

// export async function getLessonAttendance(lessonId: string, state: State): Promise<LessonAttendance[]> {
//     const lesson = await db.lessons.findById(lessonId).select('_id attendance').lean()
//     if (!_.isNil(lesson)) {
//         return lesson.attendance
//     }
//     throw errors.notFound('Lesson Not Found')
// }

// export async function getLessonTeachersNotes(lessonId: string, state: State): Promise<LessonTeachersNote[]> {
//     const lesson = await db.lessons
//         .findById(lessonId)
//         .select('_id teachersNotes')
//         .populate('teachersNotes.createdBy')
//         .lean()
//     if (!_.isNil(lesson)) {
//         return lesson.teachersNotes
//     }
//     throw errors.notFound('Lesson Not Found')
// }

// export async function createLesson(lesson: Partial<Lesson>, state: State): Promise<Lesson> {
//     const _lesson = _.merge(
//         {},
//         _.pick(lesson, [
//             'group', 'course', 'location', 'teachers', 'students',
//             'start', 'end', 'vocabularyList', 'notes',
//         ]),
//         {
//             school: state.school._id,
//             status: LessonStatus.draft,
//             lessonPlan: {
//                 title: null,
//                 focus: null,
//                 theme: null,
//                 materials: null,
//                 outcomes: [],
//             },
//             activities: [],
//             teachersNotes: [],
//             attendance: [],
//             outcomes: [],
//         }
//     )
//     const createdLesson = await db.lessons.create(_lesson)
//     return createdLesson.toObject()
// }

// export async function updateLessonById(lessonId: string, change: object, state: State): Promise<Lesson> {
//     await db.lessons.findByIdAndUpdate(lessonId, change)
//     return getLessonById(lessonId, state)
// }

// export async function updateAttendance(lessonId: string, attendance: LessonAttendance[], state: State): Promise<Lesson> {
//     await db.lessons.findByIdAndUpdate(lessonId, { $set: { attendance } })
//     return getLessonById(lessonId, state)
// }

// export async function createTeachersNote(lessonId: string, teachersNote: Partial<BaseLessonTeachersNote>, state: State): Promise<Lesson> {
//     const _teachersNote: BaseLessonTeachersNote = {
//         createdAt: moment().toDate(),
//         createdBy: String(state.user._id),
//         content: teachersNote.content,
//     }
//     const lesson = await getLessonById(lessonId, state)
//     if (!lesson.teachersNotes || lesson.teachersNotes.length < 1) {
//         await db.lessons.findByIdAndUpdate(lessonId, { $set: { teachersNotes: [_teachersNote] } })
//     } else {
//         await db.lessons.findByIdAndUpdate(lessonId, { $push: { teachersNotes: _teachersNote } })
//     }
//     return getLessonById(lessonId, state)
// }

// export async function getActivities(lessonId: string, state: State): Promise<LessonActivity[]> {
//     const lesson = await db.lessons.findById(lessonId).populate('activities').lean()
//     if (!_.isNil(lesson)) {
//         return lesson.activities
//     }
//     throw httpErrors.notFound('Lesson Not Found')
// }

// export async function updateActivities(lessonId: string, activities: string[], state: State): Promise<LessonActivity[]> {
//     await db.lessons.findByIdAndUpdate(lessonId, { $set: { activities } }).lean()
//     return await getActivities(lessonId, state)
// }

// export async function addActivityToLesson(lessonId: string, activityId: string, state: State): Promise<LessonActivity[]>
// export async function addActivityToLesson(lessonId: string, activityIds: string[], state: State): Promise<LessonActivity[]>
// export async function addActivityToLesson(lessonId: string, activityIdOrActivityIds: string|string[], state: State): Promise<LessonActivity[]> {
//     const activityIds: string[] = _.isArray(activityIdOrActivityIds) ? activityIdOrActivityIds : [activityIdOrActivityIds]
// 
//     const lesson = await db.lessons.findById(lessonId).lean()
//     if (_.isNil(lesson)) {
//         throw errors.notFound('Lesson Not Found')
//     }
// 
//     for (const i in activityIds) {
//         const activityId = activityIds[i]
// 
//         const currentActivityIds = (await db.lessons.findById(lessonId).lean()).activities
// 
//         if (_.isArray(currentActivityIds) && currentActivityIds.length > 0) {
//             if (_.union(currentActivityIds).indexOf(activityId) < 0) {
//                 await db.lessons.findByIdAndUpdate(lessonId, { $push: { activities: [activityId] } })
//             }
//         } else {
//             await db.lessons.findByIdAndUpdate(lessonId, { $set: { activities: [activityId] } })
//         }
//     }
// 
//     return await getActivities(lessonId, state)
// }

// export async function getOutcomes(lessonId: string, state: State): Promise<LessonOutcome[]> {
//     const lesson = await db.lessons.findById(lessonId).populate('outcomes.createdBy').lean()
//     if (!_.isNil(lesson)) {
//         return lesson.outcomes
//     }
//     throw httpErrors.notFound('Lesson Not Found')
// }

// export async function getSuggestedOutcomes(lessonId: string, state: State): Promise<BaseOutcome[]> {
//     const lesson: Lesson = await db.lessons.findById(lessonId).select('-attendance').populate('activities').lean()
//     if (!_.isNil(lesson)) {
//         let suggestedOutcomes: BaseOutcome[] = []
// 
//         const lessonPlanOutcomes = lesson.lessonPlan.outcomes
// 
//         suggestedOutcomes = _.concat([], suggestedOutcomes, lessonPlanOutcomes)
//         for (const i in lesson.activities) {
//             const activity: LessonActivity = <any>lesson.activities[i]
//             let addLessonActivityOutcome = true
//             for (const i in lessonPlanOutcomes) {
//                 if (String(lessonPlanOutcomes[i].parentActivity) === String(activity._id)) {
//                     addLessonActivityOutcome = false
//                     break
//                 }
//             }
//             if (addLessonActivityOutcome) {
//                 suggestedOutcomes.push({
//                     key: Math.random().toString(36).substring(2, 9),
//                     content: activity.title,
//                     parentActivity: String(activity._id),
//                 })
//             }
//         }
// 
//         for (const i in lesson.outcomes) {
//             suggestedOutcomes = suggestedOutcomes.filter(outcome => outcome.key !== lesson.outcomes[i].key && outcome.parentActivity !== lesson.outcomes[i].parentActivity)
//         }
// 
//         return suggestedOutcomes
//     }
//     throw errors.notFound('Lesson Not Found')
// }

// export async function createOutcomes(lessonId: string, outcomes: Partial<BaseOutcome>[], state: State): Promise<Lesson> {
//     const _outcomes: BaseOutcome[] = outcomes
//         .filter(outcome => _.isString(outcome.content) && !/^\s*$/.test(outcome.content))
//         .map(outcome => ({
//             key: outcome.key,
//             createdAt: moment().toDate(),
//             createdBy: String(state.user._id),
//             content: outcome.content.trim(),
//             parentActivity: outcome.parentActivity,
//             parentLessonPlanTemplate: outcome.parentLessonPlanTemplate,
//         }))
//     const lesson = await getLessonById(lessonId, state)
//     if (!lesson.outcomes || lesson.outcomes.length < 1) {
//         await db.lessons.findByIdAndUpdate(lessonId, { $set: { outcomes: _outcomes } })
//     } else {
//         await db.lessons.findByIdAndUpdate(lessonId, { $push: { outcomes: _outcomes } })
//     }
//     return getLessonById(lessonId, state)
// }

// export async function cancelLessonById(lessonId: string, state: State): Promise<Lesson> {
//     return await updateLessonById(lessonId, { $set: { status: LessonStatus.canceled } }, state)
// }

// export async function getNextLesson(params: object, fromDate: Date, state: State): Promise<Lesson> {
//     const _params = _.merge({}, params, { start: { $gte: moment(fromDate).add(2, 'seconds').toDate() } })
//     const nextLesson = await getLesson(_params, { start: 1 }, state)
//     return nextLesson
// }

// export async function getPreviousLesson(params: object, toDate: Date, state: State): Promise<Lesson> {
//     const _params = _.merge({}, params, { start: { $lt: moment(toDate).toDate() } })
//     const previousLesson = await getLesson(_params, { start: -1 }, state)
//     return previousLesson
// }
