
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import {
    IDCtx,
} from '../../../../types'
import { Model as ActivityModel, CreateModel as ActivityInputModel } from '../../../types/library/activity'
import * as activitiesServices from '../../../../services/library/activities'

export const createActivity = {
    type: ActivityModel,
    args: {
        activity: {
            type: new GraphQLNonNull(ActivityInputModel),
        },
    },
    async resolve({}: IDCtx, { activity }, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized()
        }

        const createdActivity = await activitiesServices.createActivity(activity, state)
        return createdActivity
    },
}
