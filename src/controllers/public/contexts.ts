
import { Request } from 'express'
import * as _ from 'lodash'

import {
    Context,
} from '../../types'
import * as contextServices from '../../services/context'

export const postContexts = async (req: Request) => {
    const {} = req.body



    return null
}

export const patchContext = async (req: Request) => {
    const { contextId } = req.params
    const { name } = req.body
   
    if (typeof name === 'string') {
        // await schoolsServices.setSchoolStatus(schoolId, status as SchoolStatus, req.state)
    }

    return await contextServices.getContextById(contextId, req.state)
}
