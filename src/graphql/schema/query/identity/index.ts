
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { Context } from '../../../types/identity/context'

const identity = {
    type: Context,
    args: {},
    resolve(source, {}, { state }: Request) {
        return state.idCtx
    },
}

export { identity }
