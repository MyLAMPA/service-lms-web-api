
import { Schema, SchemaTypes } from 'mongoose'

import {
    LessonStatus,
    AttendanceStatus,
} from '../../../models'

const lessonSchema = new Schema({
    school:         { type: SchemaTypes.ObjectId, ref: 'School', default: null },
    group:          { type: SchemaTypes.ObjectId, ref: 'Group', default: null },
    course:         { type: SchemaTypes.ObjectId, ref: 'Course', default: null },
    location:       { type: SchemaTypes.ObjectId, ref: 'Location', default: null },
    teachers:       [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    students:       [{ type: SchemaTypes.ObjectId, ref: 'User' }],
    start:          { type: SchemaTypes.Date, required: true },
    end:            { type: SchemaTypes.Date, required: true },
    status:         { type: SchemaTypes.String, enum: [LessonStatus.draft, LessonStatus.planned, LessonStatus.reported, LessonStatus.canceled], default: LessonStatus.draft },
    lessonPlan: {
        title:     { type: SchemaTypes.String, default: null },
        topic:     { type: SchemaTypes.String, default: null },
        focus:     { type: SchemaTypes.String, default: null },
        materials: { type: SchemaTypes.String, default: null },
        outcomes:   [{
            key:                      { type: SchemaTypes.String, required: true },
            createdBy:                { type: SchemaTypes.ObjectId, ref: 'User', required: true },
            content:                  { type: SchemaTypes.String, required: true },
            parentActivity:           { type: SchemaTypes.ObjectId, ref: 'LessonActivity', default: null },
            parentLessonPlanTemplate: { type: SchemaTypes.ObjectId, ref: 'LessonPlanTemplate', default: null },
        }],
    },
    activities:     [{ type: SchemaTypes.ObjectId, ref: 'LessonActivity' }],
    vocabularyList: [{ type: SchemaTypes.String }],
    teachersNotes:  [{
        createdAt: { type: SchemaTypes.Date, required: true },
        createdBy: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
        content:   { type: SchemaTypes.String, default: null },
    }],
    notes:          { type: SchemaTypes.String, default: null },
    attendance:     [{
        student:    { type: SchemaTypes.ObjectId, ref: 'User' },
        status:     { type: SchemaTypes.String, enum: [AttendanceStatus.present, AttendanceStatus.absent, AttendanceStatus.excused], default: null },
        absentTime: { type: SchemaTypes.Number, default: null },
        note:       { type: SchemaTypes.String, default: null },
    }],
    outcomes:       [{
        key:                      { type: SchemaTypes.String, required: true },
        createdAt:                { type: SchemaTypes.Date, default: new Date() },
        createdBy:                { type: SchemaTypes.ObjectId, ref: 'User', required: true },
        content:                  { type: SchemaTypes.String, required: true },
        parentActivity:           { type: SchemaTypes.ObjectId, ref: 'LessonActivity', default: null },
        parentLessonPlanTemplate: { type: SchemaTypes.ObjectId, ref: 'LessonPlanTemplate', default: null },
    }],
})

export { lessonSchema }
