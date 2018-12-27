
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
} from '../../../types'
import { Model as ContextModel } from '../../types/lms/context'
import * as contextServices from '../../../services/context'

export const context = {
    type: ContextModel,
    args: {},
    async resolve({ contextId }: LMSCtx, {}, { state }: Request) {
        const context = await contextServices.getContextById(contextId, state)
        return context
    },
}
