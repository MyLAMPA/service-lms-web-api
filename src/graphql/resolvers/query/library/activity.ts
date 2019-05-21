
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import {
    IDCtx,
} from '../../../../types'
import { Model as ActivityModel } from '../../../types/library/activity'
import * as activitiesServices from '../../../../services/library/activities'

export const myActivities = {
    type: new GraphQLList(ActivityModel),
    args: {},
    async resolve({}: IDCtx, {}, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized()
        }

        const activites = await activitiesServices.getUserActivities(state.idCtx.userId, state)
        return activites
    },
}

export const activity = {
    type: ActivityModel,
    args: {
        id: {
            type: GraphQLString,
        },
    },
    async resolve({}: IDCtx, { id: activityId }, { state }: Request) {
        if (activityId) {
            const activity = await activitiesServices.getActivityById(activityId, state)
            return activity
        }
        return null
    },
}

// interface GQLField<Context, Args, Request, Type = any> {}
// const gqlField =
//     <Context, Args, Request = any, Type = any>(field: GQLField<Context, Args, Request, Type>):
//         GQLField<Context, Args, Request, Type> => field
