
import { Request } from 'express'
import * as _ from 'lodash'

import {
    LmsContext,
    LmsContextStatus,
} from '../../types'
import * as lmsContextsServices from '../../services/lms/lmsContexts'

export const getLMSContext = async (req: Request) => {
    const { lmsContextId } = req.params
    const context = await lmsContextsServices.getLMSContextById(lmsContextId, req.state)
    return context
}

export const patchLMSContext = async (req: Request) => {
    const { lmsContextId } = req.params
    const { status } = req.body
   
    if (typeof status === 'string') {
        await lmsContextsServices.setLMSContextStatus(lmsContextId, status as LmsContextStatus, req.state)
    }

    return await lmsContextsServices.getLMSContextById(lmsContextId, req.state)
}
