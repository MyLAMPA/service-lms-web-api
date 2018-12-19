
import { Schema, SchemaTypes } from 'mongoose'

import {
    CEFLevel,
    LessonPlanTemplateRecomendedAge,
} from '../../../models'

const levelEnum = [
    CEFLevel.elementary, CEFLevel.preIntermediate,
    CEFLevel.intermediate, CEFLevel.upperIntermediate,
    CEFLevel.advanced, CEFLevel.veryAdvanced,
]

const recomendedAgeEnum = [
    LessonPlanTemplateRecomendedAge.children, LessonPlanTemplateRecomendedAge.youth,
    LessonPlanTemplateRecomendedAge.adults,
]

const lessonPlanTemplateSchema = new Schema({
    school:             { type: SchemaTypes.ObjectId, ref: 'School', default: null },
    createdAt:          { type: SchemaTypes.Date, default: new Date() },
    createdBy:          { type: SchemaTypes.ObjectId, ref: 'User', required: true },
    level:              [{ type: SchemaTypes.String, enum: levelEnum }],
    recomendedAge:      [{ type: SchemaTypes.String, enum: recomendedAgeEnum }],
    title:              { type: SchemaTypes.String, default: null },
    topic:              { type: SchemaTypes.String, default: null },
    focus:              { type: SchemaTypes.String, default: null },
    materials:          { type: SchemaTypes.String, default: null },
    outcome:            { type: SchemaTypes.String, default: null },
    isSchoolVisible:    { type: SchemaTypes.Boolean, default: false },
    isCommunityVisible: { type: SchemaTypes.Boolean, default: false },
})

export { lessonPlanTemplateSchema }
