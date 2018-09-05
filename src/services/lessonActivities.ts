
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    LessonActivity,
    LessonActivityCategory,
} from '../models'
import * as db from '../repositories/mongo'

export async function getLessonActivities(params: object, state: State): Promise<LessonActivity[]> {
    const lessonActivities = await db.lessonActivities.find(params).populate('createdBy').sort({ createdAt: -1 }).lean()
    return lessonActivities
}

export async function getLessonActivityById(lessonActivityId: string, state: State): Promise<LessonActivity> {
    const lessonActivity = await db.lessonActivities.findById(lessonActivityId).lean()
    if (!_.isNil(lessonActivity)) {
        return lessonActivity // .toObject()
    }
    throw errors.notFound('LessonActivity Not Found')
}

export async function createLessonActivity(lessonActivity: Partial<LessonActivity>, state: State): Promise<LessonActivity> {
    const _lessonActivity = _.merge(
        {},
        { tags: [], activityType: LessonActivityCategory.other, skills: [], level: [] },
        _.pick(lessonActivity, [
            'tags', 'category',
            'title', 'topic', 'focus',
            'isRepeatable', 'skills', 'level',
            'materials', 'preparation', 'instructions',
            'duration', 'durationMax',
            'isSchoolVisible', 'isCommunityVisible',
        ]),
        {
            school: String(state.school._id),
            createdAt: moment().toDate(),
            createdBy: String(state.user._id),
        }
    )
    const createdLessonActivity = await db.lessonActivities.create(_lessonActivity)
    return createdLessonActivity.toObject()
}

export async function updateLessonActivityById(lessonActivityId: string, change: object, state: State): Promise<LessonActivity> {
    await db.lessonActivities.findByIdAndUpdate(lessonActivityId, change)
    return getLessonActivityById(lessonActivityId, state)
}
