
import slugify from 'slugify'
import * as _ from 'lodash'
import * as moment from 'moment'

import { errorCodes } from '../../errors/errorCodes'
import { httpErrors as errors, libraryErrors, httpErrors } from '../../errors'
import {
    Partial,
    State,
    Edges,
    ProductName,
} from '../../types'
import {
    Activity,
} from '../../types/library'
import { Pagination } from '../../helpers/pagination'
import { normalizeString } from '../../helpers/normalizeString'
import { libraryRepositories } from '../../repositories'
import * as usersubscriptionsContextServices from '../subscriptions/context'

const { activitiesRepository } = libraryRepositories

export const getActivityById = async(activityId: string, state: State): Promise<Activity> => {
    const activity = await activitiesRepository.getActivityById(activityId, state)
    if (activity) {
        return activity
    }
    throw libraryErrors.activityNotFound()
}

export const getActivitiesByIds = async(activityIds: string[], state: State): Promise<Activity[]> => {
    const activities = await activitiesRepository.getActivities({ _id: { $in: activityIds } }, state)
    return activities
}

export const getActivityBySlug = async(slug: string, state: State): Promise<Activity> => {
    const activity = await activitiesRepository.getActivityBySlug(slug, state)
    if (activity) {
        return activity
    }
    throw libraryErrors.activityNotFound()
}

export const getUserActivities = async(userId: number, state: State): Promise<Activity[]> => {
    const activities = await activitiesRepository.getActivities({ createdBy: userId }, state)
    return activities
}

export const getPublishedUserActivities = async(userId: number, state: State): Promise<Activity[]> => {
    const activities = await activitiesRepository.getActivities({ createdBy: userId, 'privacy.isPublic': true }, state)
    return activities
}

export const doesActivitySlugExist = async(slug: string, state: State): Promise<boolean> => {
    try {
        await getActivityBySlug(slug, state)
        return false
    } catch (err) {
        if (_.get(err, 'errorCode') === errorCodes.library.activityNotFound) {
            return true
        }
        state.logger.error({ err }, 'Error while checking activity slug existence')
        throw err
    }
}

export const slugifyActivityTitle = async(title: string, state: State): Promise<string> => {
    const base = `${moment().utc().format('YYYYMMDD')}-${slugify(normalizeString(title, ' '), {
        replacement: '-',
        remove: null,
        lower: true,
    })}`
    for (let index = 0; index <= 50; index += 1) {
        const slug = `${base}${index > 0 ? `-${index}` : ''}`
        const isOk = await doesActivitySlugExist(slug, state)
        if (isOk) {
            return slug
        }
    }
    return `${base}-${Math.round(Math.random() * 10000)}`
}

export const createActivity = async(activity: Partial<Activity>, state: State): Promise<Activity> => {
    const slug = await slugifyActivityTitle(_.get(activity, 'title'), state)
    const document = _.merge(
        {},
        { slug: null, privacyPolicy: { isPublic: true } },
        { duration: null, isRepeatable: true, tags: [] },
        { procedure: { json: null } },
        activity,
        { slug },
        { createdAt: new Date(), createdBy: state.idCtx.userId }
    )

    if (!document.privacyPolicy.isPublic) {
        await verifyPrivateActivityEligibility(state)
    }

    const createdActivity = await activitiesRepository.createActivity(document as Activity, state)
    return createdActivity
}

export const updateActivity = async(activityId: string, activity: Partial<Activity>, state: State): Promise<void> => {
    await activitiesRepository.setOnActivity(activityId, _.pick(activity, ['title', 'procedure', 'duration', 'isRepeatable']), state)
}

export const verifyPrivateActivityEligibility = async(state: State): Promise<void> => {
    const { activeSubscriptionProducts } = await usersubscriptionsContextServices.getUserSubscriptionsContext(state)
    for (const i in activeSubscriptionProducts) {
        switch (activeSubscriptionProducts[i].name) {
            case ProductName.libraryNoLimit:
                return null
        }
    }

    throw httpErrors.forbidden()
}

export const searchPublicActivities = async(query: string, pagination: Pagination, state: State): Promise<Edges<Activity>> => {
    const elasticQuery = {
        bool: {
            must:   { query_string: { query } },
            filter: { term: { 'privacyPolicy.isPublic': true } },
        },
    }

    const elasticResponse = await activitiesRepository.elasticQueryActivities(
        elasticQuery,
        state,
        pagination.size,
        pagination.offset,
    )

    const activityIds = []
    for (const i in elasticResponse.hits.hits) {
        const { _id, _type, _score } = elasticResponse.hits.hits[i]
        activityIds.push(_id)
    }

    const edges = await getActivitiesByIds(activityIds, state)
    const edgesTotal = elasticResponse.hits.total

    const previousCursor = pagination.previous()
    return {
        edges, edgesTotal,
        pagination: {
            cursor: pagination.opaque(),
            nextCursor: pagination.next().opaque(),
            previousCursor: previousCursor ? previousCursor.opaque() : null,
        },
    }
}

export const searchMyActivities = async(query: string, pagination: Pagination, state: State): Promise<Edges<Activity>> => {
    const { userId: createdBy } = state.idCtx

    const elasticQuery = {
        bool: {
            must:   { query_string: { query } },
            filter: { term: { createdBy } },
        },
    }

    const elasticResponse = await activitiesRepository.elasticQueryActivities(
        elasticQuery,
        state,
        pagination.size,
        pagination.offset,
    )

    const activityIds = []
    for (const i in elasticResponse.hits.hits) {
        const { _id, _type, _score } = elasticResponse.hits.hits[i]
        activityIds.push(_id)
    }

    const edges = await getActivitiesByIds(activityIds, state)
    const edgesTotal = elasticResponse.hits.total

    const previousCursor = pagination.previous()
    return {
        edges, edgesTotal,
        pagination: {
            cursor: pagination.opaque(),
            nextCursor: pagination.next().opaque(),
            previousCursor: previousCursor ? previousCursor.opaque() : null,
        },
    }
}
