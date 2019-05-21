
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    Partial,
    State,
} from '../../types'
import {
    Activity,
} from '../../types/library'
import { libraryRepositories } from '../../repositories'

const { activitiesRepository } = libraryRepositories

export async function getActivityById(activityId: string, state: State): Promise<Activity> {
    const activity = await activitiesRepository.getActivityById(activityId, state)
    if (activity) {
        return activity
    }
    throw errors.notFound('Activity Not Found')
}

export async function getUserActivities(userId: number, state: State): Promise<Activity[]> {
    const activities = await activitiesRepository.getActivities({ createdBy: userId }, state)
    return activities
}

export async function createActivity(activity: Partial<Activity>, state: State): Promise<Activity> {
    const document = _.merge(
        {},
        { privacyPolicy: { isPublic: true }, isRepeatable: true, tags: [] },
        activity,
        { createdAt: new Date(), createdBy: state.idCtx.userId }
    )
    const createdActivity = await activitiesRepository.createActivity(document as Activity, state)
    return createdActivity
}
