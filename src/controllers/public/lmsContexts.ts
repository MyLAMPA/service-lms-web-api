
import { Request } from 'express'
import * as _ from 'lodash'

import {
    LMSContext,
} from '../../types'
import * as lmsContextsServices from '../../services/lmsContexts'

export const postLMSContexts = async (req: Request) => {
    const {} = req.body



    return null
}

export const patchLMSContext = async (req: Request) => {
    const { lmsContextId } = req.params
    const { name } = req.body
   
    if (typeof name === 'string') {
        // await schoolsServices.setSchoolStatus(schoolId, status as SchoolStatus, req.state)
    }

    return await lmsContextsServices.getLMSContextById(lmsContextId, req.state)
}
