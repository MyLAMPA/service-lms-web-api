
import * as _ from 'lodash'

import { httpErrors as errors } from '../../errors'
import {
    State,
    SchoolYear,
} from '../../types'
import { schoolYearsRepository } from '../../repositories'

export async function getSchoolYears(params: object, state: State): Promise<SchoolYear[]> {
    const schoolYears = await schoolYearsRepository.getSchoolYears(params, state)
    return schoolYears
}

export async function getSchoolYearById(schoolYearId: string, state: State): Promise<SchoolYear> {
    const schoolYear = await schoolYearsRepository.getSchoolYearById(schoolYearId, state)
    if (schoolYear) {
        return schoolYear
    }
    throw errors.notFound('SchoolYear Not Found')
}

// export async function createSchoolYear(schoolYear: SchoolYear, state: State): Promise<SchoolYear> {
//     const _schoolYear = _.merge(
//         {},
//         _.pick(schoolYear, ['title', 'start', 'end']),
//         { school: state.school._id }
//     )
// 
//     const createdSchoolYear = await db.schoolYears.create(_schoolYear)
//     return createdSchoolYear.toObject()
// }

// export async function updateSchoolYearById(schoolYearId: string, change: object, state: State): Promise<SchoolYear> {
//     const schoolYear = await db.schoolYears.findByIdAndUpdate(schoolYearId, change)
//     return await getSchoolYearById(schoolYearId, state)
// }

// export async function deleteSchoolYearById(schoolYearId: string, state: State): Promise<SchoolYear> {
//     const deletedSchoolYear = await db.schoolYears.findByIdAndRemove(schoolYearId)
//     return deletedSchoolYear.toObject()
// }
