
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import { httpErrors } from '../../../../errors'
import { Document } from '../../../../components/document'
import {
    IDCtx,
} from '../../../../types'
import {
    Model as ActivityModel,
    CreateModel as ActivityCreateModel,
    UpdateModel as ActivityUpdateModel,
} from '../../../types/library/activity'
import * as activitiesServices from '../../../../services/library/activities'

export const createActivity = {
    type: ActivityModel,
    args: {
        activity: {
            type: new GraphQLNonNull(ActivityCreateModel),
        },
    },
    async resolve({}: IDCtx, { activity }, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized()
        }

        const { procedure, ...rest } = activity

        let procedureDocument
        try {
            procedureDocument = Document.ParseProseMirrorJson(procedure.json)
        } catch (err) {
            throw httpErrors.badRequest('activity.procedure.json is not valid ProseMirror document')
        }

        const createdActivity = await activitiesServices.createActivity(rest, procedureDocument, state)
        return createdActivity
    },
}

export const updateActivity = {
    type: ActivityModel,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
        },
        activity: {
            type: ActivityUpdateModel,
        },
    },
    async resolve({ userId }: IDCtx, { id: activityId, activity }, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized()
        }

        const { createdBy } = await activitiesServices.getActivityById(activityId, state)
        if (userId !== createdBy) {
            throw httpErrors.unauthorized()
        }

        const { procedure, ...rest } = activity
        if (procedure) {
            let procedureDocument
            try {
                procedureDocument = Document.ParseProseMirrorJson(procedure.json)
            } catch (err) {
                throw httpErrors.badRequest('activity.procedure.json is not valid ProseMirror document')
            }
            await activitiesServices.updateActivityProcedure(activityId, procedureDocument, state)
        }
        if (!_.isEmpty(rest)) {
            await activitiesServices.updateActivity(activityId, rest, state)
        }

        return await activitiesServices.getActivityById(activityId, state)
    },
}
