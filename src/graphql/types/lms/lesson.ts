
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

import { Context as ChatContext } from '../chat/context'
import { LessonStatusEnum } from '../enums'
import { Model as GroupModel } from './group'
import { Model as CourseModel } from './course'
import { Model as LocationModel } from './location'
import { Model as StudentModel } from './student'
import { Model as TeacherModel } from './teacher'
import { Model as HomeworkModel } from './homework'
import * as lessonsServices from '../../../services/lms/lessons'
import * as groupsServices from '../../../services/lms/groups'
import * as coursesServices from '../../../services/lms/courses'
import * as locationsServices from '../../../services/lms/locations'
import * as studentsServices from '../../../services/lms/students'
import * as teachersServices from '../../../services/lms/teachers'
import * as homeworksServices from '../../../services/lms/homeworks'

export const LessonPlanOutcomeModel = new GraphQLObjectType({
    name: 'LessonPlanOutcome',
    fields: {
        key: {
            type: GraphQLString,
        },
        createdBy: {
            type: TeacherModel,
            async resolve(lessonPlanOutcome, {}, { state }: Request) {
                if (typeof lessonPlanOutcome.createdBy === 'string' || _.get(lessonPlanOutcome.createdBy, '_bsontype') === 'ObjectID') {
                    const createdBy = await teachersServices.getTeacherById(lessonPlanOutcome.createdBy, state)
                    return createdBy
                }
                if (lessonPlanOutcome.createdBy) {
                    return lessonPlanOutcome.createdBy
                }
                return null
            },
        },
        content: {
            type: GraphQLString,
        },
    },
})

export const LessonPlanModel = new GraphQLObjectType({
    name: 'LessonPlan',
    fields: {
        title: {
            type: GraphQLString,
        },
        topic: {
            type: GraphQLString,
        },
        focus: {
            type: GraphQLString,
        },
        materials: {
            type: GraphQLString,
        },
        outcomes: {
            type: new GraphQLList(LessonPlanOutcomeModel),
        },
    },
})

export const TeachersNoteModel = new GraphQLObjectType({
    name: 'TeachersNote',
    fields: {
        createdAt: {
            type: GraphQLString,
            resolve(teachersNote) {
                if (!_.isNil(teachersNote.createdAt)) {
                    return moment(teachersNote.createdAt).toISOString()
                }
                return null
            },
        },
        createdBy: {
            type: TeacherModel,
            async resolve(teachersNote, {}, { state }: Request) {
                if (typeof teachersNote.createdBy === 'string' || _.get(teachersNote.createdBy, '_bsontype') === 'ObjectID') {
                    const createdBy = await teachersServices.getTeacherById(teachersNote.createdBy, state)
                    return createdBy
                }
                if (teachersNote.createdBy) {
                    return teachersNote.createdBy
                }
                return null
            },
        },
        content: {
            type: GraphQLString,
        },
    },
})

export const LessonAttendeeStatusEnum = new GraphQLEnumType({
    name: 'LessonAttendeeStatus',
    values: {
        present: {
            value: 'present',
        },
        absent: {
            value: 'absent',
        },
        excused: {
            value: 'excused',
        },
    },
})

export const LessonAttendeeModel = new GraphQLObjectType({
    name: 'LessonAttendee',
    fields: {
        student: {
            type: StudentModel,
            async resolve(lessonAttendee, {}, { state }: Request) {
                if (typeof lessonAttendee.student === 'string' || _.get(lessonAttendee.student, '_bsontype') === 'ObjectID') {
                    const student = await studentsServices.getStudentById(lessonAttendee.student, state)
                    return student
                }
                if (lessonAttendee.student) {
                    return lessonAttendee.student
                }
                return null
            },
        },
        status: {
            type: LessonAttendeeStatusEnum,
        },
        absentTime: {
            type: GraphQLInt,
        },
        note: {
            type: GraphQLString,
        },
    },
})

export const LessonOutcomeModel = new GraphQLObjectType({
    name: 'LessonOutcome',
    fields: {
        key: {
            type: GraphQLString,
        },
        createdAt: {
            type: GraphQLString,
            resolve(lessonOutcome) {
                if (!_.isNil(lessonOutcome.createdAt)) {
                    return moment(lessonOutcome.createdAt).toISOString()
                }
                return null
            },
        },
        createdBy: {
            type: TeacherModel,
            async resolve(lessonOutcome, {}, { state }: Request) {
                if (typeof lessonOutcome.createdBy === 'string' || _.get(lessonOutcome.createdBy, '_bsontype') === 'ObjectID') {
                    const createdBy = await teachersServices.getTeacherById(lessonOutcome.createdBy, state)
                    return createdBy
                }
                if (lessonOutcome.createdBy) {
                    return lessonOutcome.createdBy
                }
                return null
            },
        },
        content: {
            type: GraphQLString,
        },
    },
})

export const Model = new GraphQLObjectType({
    name: 'Lesson',
    fields: {
        id: {
            type: GraphQLString,
            resolve(lesson) {
                if (lesson._id) {
                    return String(lesson._id)
                }
                return null
            },
        },
        group: {
            type: GroupModel,
            async resolve(lesson, {}, { state }: Request) {
                if (typeof lesson.group === 'string' || _.get(lesson.group, '_bsontype') === 'ObjectID') {
                    const group = await groupsServices.getGroupById(lesson.group, state)
                    return group
                }
                if (lesson.group) {
                    return lesson.group
                }
                return null
            },
        },
        course: {
            type: CourseModel,
            async resolve(lesson, {}, { state }: Request) {
                if (typeof lesson.course === 'string' || _.get(lesson.course, '_bsontype') === 'ObjectID') {
                    const course = await coursesServices.getCourseById(lesson.course, state)
                    return course
                }
                if (lesson.course) {
                    return lesson.course
                }
                return null
            },
        },
        location: {
            type: LocationModel,
            async resolve(lesson, {}, { state }: Request) {
                if (typeof lesson.location === 'string' || _.get(lesson.location, '_bsontype') === 'ObjectID') {
                    const location = await locationsServices.getLocationById(lesson.location, state)
                    return location
                }
                if (lesson.location) {
                    return lesson.location
                }
                return null
            },
        },
        teachers: {
            type: new GraphQLList(TeacherModel),
            async resolve(lesson, {}, { state }: Request) {
                const teachers = []
                if (_.isArray(lesson.teachers)) {
                    for (let i = 0; i < lesson.teachers.length; i += 1) {
                        const item = lesson.teachers[i]
                        if (typeof item === 'string' || _.get(item, '_bsontype') === 'ObjectID') {
                            teachers.push(await teachersServices.getTeacherById(item, state))
                            continue
                        }
                        if (item) {
                            teachers.push(item)
                            continue
                        }
                    }
                }
                return teachers
            },
        },
        students: {
            type: new GraphQLList(StudentModel),
            async resolve(lesson, {}, { state }: Request) {
                const students = []
                if (_.isArray(lesson.students)) {
                    for (let i = 0; i < lesson.students.length; i += 1) {
                        const item = lesson.students[i]
                        if (typeof item === 'string' || _.get(item, '_bsontype') === 'ObjectID') {
                            students.push(await studentsServices.getStudentById(item, state))
                            continue
                        }
                        if (item) {
                            students.push(item)
                            continue
                        }
                    }
                }
                return students
            },
        },
        start: {
            type: GraphQLString,
            resolve(lesson) {
                if (!_.isNil(lesson.start)) {
                    return moment(lesson.start).toISOString()
                }
                return null
            },
        },
        end: {
            type: GraphQLString,
            resolve(lesson) {
                if (!_.isNil(lesson.end)) {
                    return moment(lesson.end).toISOString()
                }
                return null
            },
        },
        status: {
            type: LessonStatusEnum,
        },
        lessonPlan: {
            type: LessonPlanModel,
        },
        // activities:     [{ type: SchemaTypes.ObjectId, ref: 'LessonActivity' }],
        vocabularyList: {
            type: new GraphQLList(GraphQLString),
        },
        // teachersNotes: {
        //     type: new GraphQLList(TeachersNoteModel),
        // },
        chat: {
            type: ChatContext,
            async resolve(lesson, {}, { state }: Request) {
                return { ctxType: 'lesson', ctxId: lesson._id }
            },
        },
        notes: {
            type: GraphQLString,
        },
        // attendance: {
        //     type: new GraphQLList(LessonAttendeeModel),
        //     async resolve(lesson, {}, { state }: Request) {
        //         const attendance = await lessonsServices.getLessonAttendance(lesson._id, state)
        //         return attendance
        //     },
        // },
        outcomes: {
            type: new GraphQLList(LessonOutcomeModel),
        },
        homeworks: {
            type: new GraphQLList(HomeworkModel),
            async resolve(lesson, {}, { state }: Request) {
                const query = {
                    $or: [
                        { originLesson: lesson._id },
                        { dueLesson: lesson._id },
                    ]
                }

                const homeworks = await homeworksServices.getHomeworks(query, true, true, state)
                return homeworks
            },
        },
    },
})
