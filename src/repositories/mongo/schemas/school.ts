
import { Schema, SchemaTypes } from 'mongoose'

const timetableSettings = {
    startHour: { type: SchemaTypes.Date, required: true },
    endHour:   { type: SchemaTypes.Date, required: true },
}

const schoolSchema = new Schema({
    timetableSettings,
    createdAt:             { type: SchemaTypes.Date, default: new Date() },
    name:                  { type: SchemaTypes.String, required: true },
    abbr:                  { type: SchemaTypes.String, default: null },
    email:                 { type: SchemaTypes.String, default: null },
    mobile:                { type: SchemaTypes.String, default: null },
    externalWebUrl:        { type: SchemaTypes.String, default: null },
    defaultLessonDuration: { type: SchemaTypes.Number, default: 45 },
    currentSchoolYear:     { type: SchemaTypes.ObjectId, ref: 'SchoolYear', default: null },
})

export { schoolSchema }
