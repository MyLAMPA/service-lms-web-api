
import * as _ from 'lodash'
import * as moment from 'moment'

import { config } from '../../config'
import {
    State,
    LmsContext,
    LmsContextStatus,
} from '../../types'
import { source } from './source'
import { LmsTableName } from './schemas'
import { lmsContextSchema } from './schemas/lmsContext'

const lmsContextsCollection = source.collection<LmsContext>(
    LmsTableName.lmsContext,
    lmsContextSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-lmscontexts`
)

export async function getLMSContextById(lmsContextId: string, state: State): Promise<LmsContext> {
    const lmsContext = await lmsContextsCollection.findById(lmsContextId)
    if (!_.isEmpty(lmsContext)) {
        return lmsContext
    }
    return null
}

export async function updateLMSContextStatus(lmsContextId: string, status: LmsContextStatus, state: State): Promise<void> {
    await lmsContextsCollection.findByIdAndUpdate(lmsContextId, { $set: { status } })
}

export async function createLmsContext(lmsContext: LmsContext, state: State): Promise<LmsContext> {
    const document = _.merge(
        {},
        {
            status: LmsContextStatus.freetrial,
            mode: null,
            createdAt: new Date(),
            // linkedSchoolId: null,
            name: null,
            abbr: null,
            externalWebUrl: null,
            defaultLessonDuration: 45,
            currentSchoolYear: null,
            timetableSettings: {
                startHour: moment().hours(8).minutes(0).toDate(),
                endHour: moment().hours(16).minutes(0).toDate(),
            }
        },
        _.pick(lmsContext, [
            'status', 'mode', 'name', 'abbr', 'externalWebUrl',
            'defaultLessonDuration', 'currentSchoolYear',
            'timetableSettings.startHour', 'timetableSettings.endHour',
        ]),
    )

    const createdLmsContext = await lmsContextsCollection.create(document)
    return createdLmsContext
}
