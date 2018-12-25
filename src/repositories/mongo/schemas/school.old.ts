
// import { Schema, SchemaTypes } from 'mongoose'

// import {
//     SchoolStatus,
// } from '../../../models'

// const schoolStatusEnum = [
//     SchoolStatus.trial, SchoolStatus.active,
//     SchoolStatus.suspended, SchoolStatus.archived,
// ]

// const timetableSettings = {
//     startHour: { type: SchemaTypes.Date, required: true },
//     endHour:   { type: SchemaTypes.Date, required: true },
// }

// const schoolSchema = new Schema({
//     timetableSettings,
//     status:                { type: SchemaTypes.String, enum: schoolStatusEnum, required: true },
//     createdAt:             { type: SchemaTypes.Date, default: new Date() },
//     billingInfo:           { type: SchemaTypes.ObjectId, ref: 'BillingInfo', default: null },
//     name:                  { type: SchemaTypes.String, required: true },
//     abbr:                  { type: SchemaTypes.String, default: null },
//     externalWebUrl:        { type: SchemaTypes.String, default: null },
//     defaultLessonDuration: { type: SchemaTypes.Number, default: 45 },
//     currentSchoolYear:     { type: SchemaTypes.ObjectId, ref: 'SchoolYear', default: null },
// })

// export { schoolSchema }
