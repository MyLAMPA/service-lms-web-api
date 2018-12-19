
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Lesson,
    LessonStatus,
    LessonAttendance,
    LessonTeachersNote,
    LessonActivity,
    BaseLessonTeachersNote,
    BaseLessonPlan,
    BaseOutcome,
    BaseLessonOutcome,
    LessonOutcome,
} from '../models'
// import * as db from '../repositories/mongo'

async function getLessonsQuery(params: object, state: State): Promise<object> {
    const query = {}
    // TODO: Implement function, wait.. how's that it's working right now??
    return query
}

export async function getLessons(
    params: object,
    populateLocation: boolean,
    populateCourse: boolean,
    populateGroup: boolean,
    populateTeachers: boolean,
    populateStudents: boolean,
    state: State
): Promise<Lesson[]> {
    throw errors.serverError('deprached api')
}

export async function getLesson(params: object, sort: object, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function countLessons(params: object, state: State): Promise<number> {
    throw errors.serverError('deprached api')
}

export async function getLessonById(lessonId: string, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function getLessonAttendance(lessonId: string, state: State): Promise<LessonAttendance[]> {
    throw errors.serverError('deprached api')
}

export async function getLessonTeachersNotes(lessonId: string, state: State): Promise<LessonTeachersNote[]> {
    throw errors.serverError('deprached api')
}

export async function createLesson(lesson: Partial<Lesson>, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function updateLessonById(lessonId: string, change: object, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function updateAttendance(lessonId: string, attendance: LessonAttendance[], state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function createTeachersNote(lessonId: string, teachersNote: Partial<BaseLessonTeachersNote>, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function getActivities(lessonId: string, state: State): Promise<LessonActivity[]> {
    throw errors.serverError('deprached api')
}

export async function updateActivities(lessonId: string, activities: string[], state: State): Promise<LessonActivity[]> {
    throw errors.serverError('deprached api')
}

export async function addActivityToLesson(lessonId: string, activityId: string, state: State): Promise<LessonActivity[]>
export async function addActivityToLesson(lessonId: string, activityIds: string[], state: State): Promise<LessonActivity[]>
export async function addActivityToLesson(lessonId: string, activityIdOrActivityIds: string|string[], state: State): Promise<LessonActivity[]> {
    throw errors.serverError('deprached api')
}

export async function getOutcomes(lessonId: string, state: State): Promise<LessonOutcome[]> {
    throw errors.serverError('deprached api')
}

export async function getSuggestedOutcomes(lessonId: string, state: State): Promise<BaseOutcome[]> {
    throw errors.serverError('deprached api')
}

export async function createOutcomes(lessonId: string, outcomes: Partial<BaseOutcome>[], state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function cancelLessonById(lessonId: string, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function getNextLesson(params: object, fromDate: Date, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}

export async function getPreviousLesson(params: object, toDate: Date, state: State): Promise<Lesson> {
    throw errors.serverError('deprached api')
}
