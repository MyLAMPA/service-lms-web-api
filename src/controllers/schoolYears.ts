
import { Request, Response } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    UserRole,
} from '../models'
import * as schoolYearsServices from '../services/schoolYears'

export async function getSchoolYears(req: Request, res: Response) {
    let query = null

    switch (req.state.activeRole) {
        case UserRole.admin:
        case UserRole.teacher:
            query = { school: req.state.school._id }
            break
        default:
            throw errors.forbidden('Forbidden SchoolYears')
    }

    const schoolYears = await schoolYearsServices.getSchoolYears(query, req.state)
    return schoolYears
}

export async function postSchoolYears(req: Request, res: Response) {
    if (req.state.activeRole !== UserRole.admin) {
        throw errors.forbidden('Admin Only')
    }
    const schoolYear = await schoolYearsServices.createSchoolYear(req.body, req.state)
    return schoolYear
}

export async function getSchoolYear(req: Request, res: Response) {
    const schoolYear = await schoolYearsServices.getSchoolYearById(req.params.schoolYearId, req.state)
    if (String(schoolYear.school) === String(req.state.school._id)) {
        return schoolYear
    }
    throw errors.forbidden('Forbidden SchoolYear')
}

export async function putSchoolYear(req: Request, res: Response) {
    const schoolYearId = req.params.schoolYearId
    const schoolYear = await schoolYearsServices.getSchoolYearById(schoolYearId, req.state)

    if (String(schoolYear.school) === String(req.state.school._id)) {
        if (req.state.activeRole === UserRole.admin) {
            const change = { $set: _.pick(req.body, ['title', 'start', 'end']) }
            return await schoolYearsServices.updateSchoolYearById(schoolYearId, change, req.state)
        }

        throw errors.forbidden('Admin Only')
    }

    throw errors.forbidden('Forbidden SchoolYear')
}

export async function deleteSchoolYear(req: Request, res: Response) {
    const schoolYearId = req.params.schoolYearId
    const schoolYear = await schoolYearsServices.getSchoolYearById(schoolYearId, req.state)

    if (String(schoolYear.school) === String(req.state.school._id)) {
        if (req.state.activeRole === UserRole.admin) {
            return await schoolYearsServices.deleteSchoolYearById(schoolYearId, req.state)
        }

        throw errors.forbidden('Admin Only')
    }

    throw errors.forbidden('Forbidden SchoolYear')
}
