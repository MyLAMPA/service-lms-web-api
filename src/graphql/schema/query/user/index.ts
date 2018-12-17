
import { Request } from 'express'
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { Context } from '../../../types/user/context'

const user = {
    type: Context,
    args: {},
    resolve(source, {}, { state }: Request) {
        
        return state.access
    },
}

export { user }
