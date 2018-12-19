
// import { SchemaTypes, Schema } from 'mongoose'

// import {
//     LessonActivitySkill,
//     LessonActivityCategory,
//     CEFLevel,
// } from '../../../models'

// const lessonActivityCategoryEnum = [
//     LessonActivityCategory.other, LessonActivityCategory.gamesPuzzles,
//     LessonActivityCategory.storiesSongsPoetryProse, LessonActivityCategory.discussionDebates,
//     LessonActivityCategory.presentationsDemonstrations, LessonActivityCategory.worksheetsTestsQuizzes,
//     LessonActivityCategory.drillsDictations,
// ]

// const lessonActivitySkillEnum = [
//     LessonActivitySkill.writing, LessonActivitySkill.listening,
//     LessonActivitySkill.reading, LessonActivitySkill.speaking,
// ]

// const cefLevelEnum = [
//     CEFLevel.elementary, CEFLevel.preIntermediate, CEFLevel.intermediate,
//     CEFLevel.upperIntermediate, CEFLevel.advanced, CEFLevel.veryAdvanced,
// ]

// const lessonActivitySchema = new Schema({
//     school:             { type: SchemaTypes.ObjectId, ref: 'School', default: null },
//     createdAt:          { type: SchemaTypes.Date, default: new Date() },
//     createdBy:          { type: SchemaTypes.ObjectId, ref: 'User', required: true },
//     tags:               [{ type: SchemaTypes.String }],
//     category:           { type: SchemaTypes.String, enum: lessonActivityCategoryEnum },
//     title:              { type: SchemaTypes.String },
//     topic:              { type: SchemaTypes.String },
//     focus:              { type: SchemaTypes.String },
//     isRepeatable:       { type: SchemaTypes.Boolean, default: false },
//     skills:             [{ type: SchemaTypes.String, enum: lessonActivitySkillEnum }],
//     level:              [{ type: SchemaTypes.String, enum: cefLevelEnum }],
//     materials:          { type: SchemaTypes.String, default: null },
//     preparation:        { type: SchemaTypes.String, default: null },
//     instructions:       { type: SchemaTypes.String, default: null },
//     duration:           { type: SchemaTypes.Number, default: null },
//     durationMax:        { type: SchemaTypes.Number, default: null },
//     isSchoolVisible:    { type: SchemaTypes.Boolean, default: false },
//     isCommunityVisible: { type: SchemaTypes.Boolean, default: false },
// })

// export { lessonActivitySchema }
