
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { createActivity } from './activity'

export const library = {
    type: new GraphQLObjectType({
        name: 'M_Library_Context',
        fields: {
            createActivity,
        },
    }),
    args: {},
    resolve(source, {}, { state }: Request) {
        return state.idCtx
    },
}
