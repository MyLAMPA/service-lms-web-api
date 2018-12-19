
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    LessonActivity,
    LessonActivityCategory,
} from '../models'

export async function getLessonActivities(params: object, state: State): Promise<LessonActivity[]> {
    throw errors.serverError('deprached api')
}

export async function getLessonActivityById(lessonActivityId: string, state: State): Promise<LessonActivity> {
    throw errors.serverError('deprached api')
}

export async function createLessonActivity(lessonActivity: Partial<LessonActivity>, state: State): Promise<LessonActivity> {
    throw errors.serverError('deprached api')
}

export async function updateLessonActivityById(lessonActivityId: string, change: object, state: State): Promise<LessonActivity> {
    throw errors.serverError('deprached api')
}
