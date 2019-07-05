
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import {
    IDCtx,
} from '../../../../types'
import { Pagination } from '../../../../helpers/pagination'
import { Model as PaginationModel } from '../../../types/pagination'
import {
    Model as ActivityModel,
    Edges as ActivityEdges,
} from '../../../types/library/activity'
import * as activitiesServices from '../../../../services/library/activities'

export const activity = {
    type: ActivityModel,
    args: {
        slug: {
            type: GraphQLString,
        },
    },
    async resolve({}: IDCtx, { slug }, { state }: Request) {
        if (slug) {
            const activity = await activitiesServices.getActivityBySlug(slug, state)
            return activity
        }
        return null
    },
}

export const searchMyActivities = {
    type: ActivityEdges,
    args: {
        query: {
            type: new GraphQLNonNull(GraphQLString),
        },
        pagination: {
            type: PaginationModel,
        },
    },
    async resolve({ virtual, userId }: IDCtx, { query, pagination }, { state }: Request) {
        if (virtual) {
            throw httpErrors.unauthorized()
        }

        return await activitiesServices.searchMyActivities(
            query,
            Pagination.parse(pagination),
            state,
        )
    },
}

export const searchActivities = {
    type: ActivityEdges,
    args: {
        query: {
            type: GraphQLString,
        },
        pagination: {
            type: PaginationModel,
        },
    },
    async resolve({ virtual }: IDCtx, { query, pagination }, { state }: Request) {
        if (virtual) {
            throw httpErrors.unauthorized()
        }

        return await activitiesServices.searchPublicActivities(
            query,
            Pagination.parse(pagination),
            state,
        )
    },
}
