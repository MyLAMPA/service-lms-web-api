
import { Schema, SchemaTypes } from 'mongoose'

import {
    ContextStatus,
} from '../../../types'
import { SchoolYearName } from './schoolYear'

export const ContextName = 'Context'

const contextStatusEnum = [
    ContextStatus.freetrial, ContextStatus.active,
    ContextStatus.suspended, ContextStatus.archived,
]

const timetableSettings = {
    startHour: { type: SchemaTypes.Date, required: true },
    endHour:   { type: SchemaTypes.Date, required: true },
}

const contextSchema = new Schema({
    timetableSettings,
    status:                { type: SchemaTypes.String, enum: contextStatusEnum, required: true },
    createdAt:             { type: SchemaTypes.Date, default: new Date() },
    // billingInfo:           { type: SchemaTypes.ObjectId, ref: 'BillingInfo', default: null },
    name:                  { type: SchemaTypes.String, required: true },
    abbr:                  { type: SchemaTypes.String, default: null },
    externalWebUrl:        { type: SchemaTypes.String, default: null },
    defaultLessonDuration: { type: SchemaTypes.Number, default: 45 },
    currentSchoolYear:     { type: SchemaTypes.ObjectId, ref: SchoolYearName, default: null },
})

export { contextSchema }
