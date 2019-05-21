
import * as _ from 'lodash'
import { CastError } from 'mongoose'

import { config } from '../../../config'
import { httpErrors } from '../../../errors'
import {
    State,
} from '../../../types'
import {
    Activity,
} from '../../../types/library'
import { source } from '../../mongo/source'
import { activitySchema, ActivityName } from './schemas/activity'

const activitiesCollection = source.collection<Activity>(
    ActivityName,
    activitySchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}library-activities`
)

export async function getActivities(params: object, state: State) {
    const activities = await activitiesCollection.find(params)
    return activities
        .filter(activity => !_.isEmpty(activity))
        .map(activity => <Activity>activity)
}

export async function getActivityById(activityId: string, state: State): Promise<Activity> {
    let activity
    try {
        activity = await activitiesCollection.findById(activityId)
    } catch (err) {
        if (err instanceof CastError) {
            throw httpErrors.notFound('Activity Not Found', 3002)
        }
        throw err
    }

    if (!_.isEmpty(activity)) {
        return activity
    }
    return null
}

export async function createActivity(document: Activity, state: State): Promise<Activity> {
    const createdActivity = await activitiesCollection.create(document)
    return createdActivity
}
