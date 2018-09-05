
import { Request } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    LessonActivity,
    SharedItemSource,
} from '../models'
import * as lessonActivitiesServices from '../services/lessonActivities'

export async function getLessonActivities(req: Request) {
    let lessonActivities: LessonActivity[] = []
    let query: any = {}

    if (req.query.level) {
        query.level = { $in: String(req.query.level).split(',') }
    }

    if (req.query.skills) {
        query.skills = { $in: String(req.query.skills).split(',') }
    }

    const sources: SharedItemSource[] = <SharedItemSource[]>(String(req.query.source).split(','))

    if (sources.indexOf(SharedItemSource.own) >= 0) {
        const ownLessonActivities = await lessonActivitiesServices.getLessonActivities(_.merge({}, query, { createdBy: String(req.state.user._id) }), req.state)
        lessonActivities = _.concat([], lessonActivities, ownLessonActivities)
    }

    if (sources.indexOf(SharedItemSource.school) >= 0) {
        const schoolLessonActivities = await lessonActivitiesServices.getLessonActivities(_.merge({}, query, { school: String(req.state.school._id), isSchoolVisible: true }), req.state)
        lessonActivities = _.concat([], lessonActivities, schoolLessonActivities)
    }

    if (sources.indexOf(SharedItemSource.community) >= 0) {
        const communityLessonActivities = await lessonActivitiesServices.getLessonActivities(_.merge({}, query, { isCommunityVisible: true }), req.state)
        lessonActivities = _.concat([], lessonActivities, communityLessonActivities)
    }

    return _.unionBy(lessonActivities, lessonActivity => lessonActivity._id)
}

export async function postLessonActivities(req: Request) {
    const lessonActivity = await lessonActivitiesServices.createLessonActivity(req.body, req.state)
    return lessonActivity
}

export async function getLessonActivity(req: Request) {
    const lessonActivity = await lessonActivitiesServices.getLessonActivityById(req.params.lessonActivityId, req.state)
    return lessonActivity
}

export async function putLessonActivity(req: Request) {
    const lessonActivityId = req.params.lessonActivityId
    const lessonActivity = await lessonActivitiesServices.getLessonActivityById(lessonActivityId, req.state)

    if (String((<any>lessonActivity.createdBy)._id) === String(req.state.user._id)) {
        const change = { $set: _.pick(req.body, ['tags', 'category',
        'title', 'topic', 'focus',
        'isRepeatable', 'skills', 'level',
        'materials', 'preparation', 'instructions',
        'duration', 'durationMax',
        'isSchoolVisible', 'isCommunityVisible']) }
        return await lessonActivitiesServices.updateLessonActivityById(lessonActivityId, change, req.state)
    }

    throw errors.forbidden('Forbidden LessonActivity')
}
