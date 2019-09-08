
import * as _ from 'lodash'

import { config } from '../../config'
import {
    State,
    SchoolYear,
} from '../../types'
import { source } from './source'
import { LmsTableName } from './schemas'
import { schoolYearSchema } from './schemas/schoolYear'

const schoolYearsCollection = source.collection<SchoolYear>(
    LmsTableName.schoolYear,
    schoolYearSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-schoolyears`
)

export async function getSchoolYears(params: object, state: State): Promise<SchoolYear[]> {
    const schoolYears = await schoolYearsCollection.find(params)
    return schoolYears
        .filter(schoolYear => !_.isEmpty(schoolYear))
        .map(schoolYear => <SchoolYear>schoolYear)
}

export async function getSchoolYearById(schoolYearId: string, state: State): Promise<SchoolYear> {
    const schoolYear = await schoolYearsCollection.findById(schoolYearId)
    if (!_.isEmpty(schoolYear)) {
        return schoolYear
    }
    return null
}
