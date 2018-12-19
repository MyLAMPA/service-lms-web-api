
import * as _ from 'lodash'
import * as moment from 'moment'
import { v4 as uuidv4 } from 'uuid'

import { httpErrors as errors, httpErrors } from '../errors'
import {
    State,
    Lesson,
    LessonStatus,
    LessonAttendance,
    LessonTeachersNote,
    BaseLessonTeachersNote,
    BaseLessonPlan,
    BaseLessonOutcome,
    LessonOutcome,
    BaseOutcome,
} from '../models'

export async function getLessonPlan(lessonId: string, state: State): Promise<BaseLessonPlan> {
    throw errors.serverError('deprached api')
}

export async function updateLessonPlan(lessonId: string, lessonPlan: Partial<BaseLessonPlan>, state: State): Promise<BaseLessonPlan> {
    throw errors.serverError('deprached api')
}

export async function mergeOutcomeToLessonPlan(lessonId: string, outcome: BaseOutcome, state: State): Promise<BaseLessonPlan>
export async function mergeOutcomeToLessonPlan(lessonId: string, outcome: BaseOutcome[], state: State): Promise<BaseLessonPlan>
export async function mergeOutcomeToLessonPlan(lessonId: string, outcomeOrOutcomes: BaseOutcome|BaseOutcome[], state: State): Promise<BaseLessonPlan> {
    throw errors.serverError('deprached api')
}

export async function createLessonPlanOutcome(lessonId: string, outcome: Partial<BaseOutcome>, state: State): Promise<BaseOutcome[]> {
    throw errors.serverError('deprached api')
}

export async function deleteLessonPlanOutcome(lessonId: string, outcomeKey: string, state: State): Promise<BaseOutcome[]> {
    throw errors.serverError('deprached api')
}
