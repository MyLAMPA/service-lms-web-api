
import { Request } from 'express'
import * as _ from 'lodash'

import {
    Context,
    ContextStatus,
} from '../../types'
import * as contextServices from '../../services/context'

export const getContext = async (req: Request) => {
    const { contextId } = req.params
    const context = await contextServices.getContextById(contextId, req.state)
    return context
}

export const patchContext = async (req: Request) => {
    const { contextId } = req.params
    const { status } = req.body
   
    if (typeof status === 'string') {
        await contextServices.setContextStatus(contextId, status as ContextStatus, req.state)
    }

    return await contextServices.getContextById(contextId, req.state)
}
