
import { Request } from 'express'
import * as _ from 'lodash'

import {
    School,
    SchoolStatus,
} from '../types'
import * as schoolsServices from '../services/schools'

export const getSchool = async (req: Request) => {
    const { schoolId } = req.params
    const school = await schoolsServices.getSchoolById(schoolId, false, req.state)
    return school
}

export const patchSchool = async (req: Request) => {
    const { schoolId } = req.params
    const { status } = req.body
   
    if (typeof status === 'string') {
        await schoolsServices.setSchoolStatus(schoolId, status as SchoolStatus, req.state)
    }

    return await schoolsServices.getSchoolById(schoolId, false, req.state)
}
