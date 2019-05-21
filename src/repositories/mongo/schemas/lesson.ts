
import { Schema, SchemaTypes } from 'mongoose'

import {
    LessonStatus,
    AttendanceStatus,
} from '../../../types'
import { LMSContextName } from './lmsContext'
import { GroupName } from './group'
import { CourseName } from './course'
import { LocationName } from './location'
import { TeacherName } from './teacher'
import { StudentName } from './student'

export const LessonName = 'Lesson'

const lessonSchema = new Schema({
    context:        { type: SchemaTypes.ObjectId, ref: LMSContextName, default: null },
    group:          { type: SchemaTypes.ObjectId, ref: GroupName, default: null },
    course:         { type: SchemaTypes.ObjectId, ref: CourseName, default: null },
    location:       { type: SchemaTypes.ObjectId, ref: LocationName, default: null },
    teacher:        { type: SchemaTypes.ObjectId, ref: TeacherName, default: null },
    students:      [{ type: SchemaTypes.ObjectId, ref: StudentName }],
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
        student:    { type: SchemaTypes.ObjectId, ref: StudentName },
        status:     { type: SchemaTypes.String, enum: [AttendanceStatus.present, AttendanceStatus.absent, AttendanceStatus.excused], default: null },
        absentTime: { type: SchemaTypes.Number, default: null },
        note:       { type: SchemaTypes.String, default: null },
    }],
})

export { lessonSchema }
