
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { httpErrors } from '../../../../errors'
import { user } from './user'
import { lmsContextMemberships } from './lmsContextMemberships'

export const identity = {
    type: new GraphQLObjectType({
        name: 'Identity_Context',
        fields: {
            user,
            lmsContextMemberships,
        },
    }),
    args: {},
    resolve(source, {}, { state }: Request) {
        if (state.idCtx.virtual) {
            throw httpErrors.unauthorized('Unauthorized Request')
        }
        return state.idCtx
    },
}
