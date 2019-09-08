
import { Schema, SchemaTypes } from 'mongoose'

import {
    LessonStatus,
    AttendanceStatus,
} from '../../../types'
import { LmsTableName } from '.'

const lessonSchema = new Schema({
    context:        { type: SchemaTypes.ObjectId, ref: LmsTableName.lmsContext, default: null },
    group:          { type: SchemaTypes.ObjectId, ref: LmsTableName.group, default: null },
    course:         { type: SchemaTypes.ObjectId, ref: LmsTableName.course, default: null },
    location:       { type: SchemaTypes.ObjectId, ref: LmsTableName.location, default: null },
    teacher:        { type: SchemaTypes.ObjectId, ref: LmsTableName.teacher, default: null },
    students:      [{ type: SchemaTypes.ObjectId, ref: LmsTableName.student }],
    start:          { type: SchemaTypes.Date, required: true },
    end:            { type: SchemaTypes.Date, required: true },
    status:         { type: SchemaTypes.String, enum: [LessonStatus.draft, LessonStatus.planned, LessonStatus.reported, LessonStatus.canceled], default: LessonStatus.draft },
    lessonPlan:     {
        title:     { type: SchemaTypes.String, default: null },
        topic:     { type: SchemaTypes.String, default: null },
        focus:     { type: SchemaTypes.String, default: null },
        materials: { type: SchemaTypes.String, default: null },
    },
    notes:          { type: SchemaTypes.String, default: null },
    attendance:    [{
        student:    { type: SchemaTypes.ObjectId, ref: LmsTableName.student },
        status:     { type: SchemaTypes.String, enum: [AttendanceStatus.present, AttendanceStatus.absent, AttendanceStatus.excused], default: null },
        absentTime: { type: SchemaTypes.Number, default: null },
        note:       { type: SchemaTypes.String, default: null },
    }],
})

export { lessonSchema }
