
import * as _ from 'lodash'
import { Error } from 'mongoose'

const { CastError } = Error

import { config } from '../../../config'
import { httpErrors } from '../../../errors'
import {
    Partial,
    State,
} from '../../../types'
import {
    Activity,
    Document,
} from '../../../types/library'
import { source } from '../../mongo/source'
import { makeElasticQueryOnCollection } from '../../../components/elasticsearch'
import { activitySchema, ActivityName } from './schemas/activity'

const activitiesCollection = source.collection<Activity>(
    ActivityName,
    activitySchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}library-activities`
)

export const getActivities = async(params: object, state: State) => {
    const activities = await activitiesCollection.find(params)
    return activities
        .filter(activity => !_.isEmpty(activity))
        .map(activity => <Activity>activity)
}

export const getActivityById = async(activityId: string, state: State): Promise<Activity> => {
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

export const getActivityBySlug = async(slug: string, state: State): Promise<Activity> => {
    let activity
    try {
        activity = await activitiesCollection.findOne({ slug })
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

export const createActivity = async(document: Activity, state: State): Promise<Activity> => {
    const createdActivity = await activitiesCollection.create(document)
    return createdActivity
}

export const setOnActivity = async(id: string, document: Partial<Activity>, state: State): Promise<void> => {
    await activitiesCollection.findByIdAndUpdate(id, { $set: document || {} })
}

;(async() => {
    (activitiesCollection as any).createMapping((err, mapping) => {
        if (err) {
            console.error(err)
            return null
        }
        console.log(JSON.stringify(mapping, null, 4))
    })
})

export const elasticQueryActivities = async(query: object, state: State, size: number = undefined, from: number = undefined) =>
    makeElasticQueryOnCollection<Activity>(activitiesCollection, query, state, size, from)
