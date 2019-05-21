
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    LMSCtx,
} from '../../../../types'
import { Model as ContextModel } from '../../../types/lms/context'
import * as lmsContextsServices from '../../../../services/lmsContexts'

export const context = {
    type: ContextModel,
    args: {},
    async resolve({ contextId }: LMSCtx, {}, { state }: Request) {
        const lmsContext = await lmsContextsServices.getLMSContextById(contextId, state)
        return lmsContext
    },
}
