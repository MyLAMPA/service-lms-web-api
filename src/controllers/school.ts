
import { Request, Response } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import { toBoolean } from '../helpers/convert'
import {
    UserRole,
} from '../models'
import * as schoolsServices from '../services/schools'

export async function getSchool(req: Request, res: Response) {
    const populateCurrentSchoolYear = toBoolean(req.query.populateCurrentSchoolYear)
    const school = await schoolsServices.getSchoolById(req.state.school._id, populateCurrentSchoolYear, req.state)
    return school
}

export async function putSchool(req: Request, res: Response) {
    const change = { $set: _.pick(req.body, ['name', 'abbr', 'email', 'mobile', 'externalWebUrl', 'defaultLessonDuration', 'timetableSettings.startHour', 'timetableSettings.endHour', 'currentSchoolYear']) }
    const school = await schoolsServices.updateSchoolById(req.state.school._id, change, req.state)
    return school
}
