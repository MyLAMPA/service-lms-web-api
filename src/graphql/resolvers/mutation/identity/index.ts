
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { updatePaymentCard } from './paymentCard'

export const identity = {
    type: new GraphQLObjectType({
        name: 'M_Identity_Context',
        fields: {
            updatePaymentCard,
        },
    }),
    args: {},
    resolve(source, {}, { state }: Request) {
        return state.idCtx
    },
}
