
import { Schema, SchemaTypes } from 'mongoose'

import {
    LmsContextStatus,
    LmsContextMode,
} from '../../../types'
import { LmsTableName } from '.'

const lmsContextStatusEnum = [
    LmsContextStatus.freetrial, LmsContextStatus.active,
    LmsContextStatus.suspended, LmsContextStatus.archived,
]

const lmsContextModeEnum = [
    LmsContextMode.freelancer,
    LmsContextMode.school,
]

const timetableSettings = {
    startHour: { type: SchemaTypes.Date, required: true },
    endHour:   { type: SchemaTypes.Date, required: true },
}

const lmsContextSchema = new Schema({
    timetableSettings,
    status:                { type: SchemaTypes.String, enum: lmsContextStatusEnum, required: true },
    mode:                  { type: SchemaTypes.String, enum: lmsContextModeEnum, required: true },
    createdAt:             { type: SchemaTypes.Date, default: new Date() },
    linkedSchoolId:        { type: SchemaTypes.Number, default: null },
    // billingInfo:           { type: SchemaTypes.ObjectId, ref: 'BillingInfo', default: null },
    name:                  { type: SchemaTypes.String, required: true },
    abbr:                  { type: SchemaTypes.String, default: null },
    externalWebUrl:        { type: SchemaTypes.String, default: null },
    defaultLessonDuration: { type: SchemaTypes.Number, default: 45 },
    currentSchoolYear:     { type: SchemaTypes.ObjectId, ref: LmsTableName.schoolYear, default: null },
})

export { lmsContextSchema }
