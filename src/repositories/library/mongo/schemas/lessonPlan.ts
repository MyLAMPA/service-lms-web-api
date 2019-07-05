
import { Schema, SchemaTypes } from 'mongoose'

import {
    CEFLevel,
    RecomendedAge,
} from '../../../../types/library'
import { SubjectName } from './subject'

const cefLevelEnum = [
    CEFLevel.elementary, CEFLevel.preIntermediate, CEFLevel.intermediate,
    CEFLevel.upperIntermediate, CEFLevel.advanced, CEFLevel.veryAdvanced,
]

const recomendedAgeEnum = [
    RecomendedAge.children,
    RecomendedAge.youth,
    RecomendedAge.adults,
]

export const LessonPlanName = 'library-LessonPlan'

export const lessonPlanSchema = new Schema({
    createdAt:      { type: SchemaTypes.Date, default: null },
    createdBy:      { type: SchemaTypes.Number, default: null },
    slug:           { type: SchemaTypes.String, default: null },
    subject:        { type: SchemaTypes.ObjectId, ref: SubjectName, default: null },
    cefLevel:      [{ type: SchemaTypes.String, enum: cefLevelEnum, default: null }],
    recomendedAge: [{ type: SchemaTypes.String, enum: recomendedAgeEnum, default: null }],
    title:          { type: SchemaTypes.String, default: null },
    materials:      { type: SchemaTypes.String, default: null },
    tags:          [{
        key:  { type: SchemaTypes.String, required: true },
        name: { type: SchemaTypes.String },
        text: { type: SchemaTypes.String },
    }],
})
