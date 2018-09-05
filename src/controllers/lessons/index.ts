
import { Request, Response } from 'express'
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors, httpErrors } from '../../errors'
import { toBoolean } from '../../helpers/convert'
import {
    UserRole,
} from '../../models'
import * as lessonsServices from '../../services/lessons'

export async function getLessons(req: Request) {
    const query: any = { school: req.state.school._id }
    
    let populateLocation = false
    let populateCourse = false
    let populateGroup = false
    let populateTeachers = false
    let populateStudents = false

    if (_.isString(req.query.status)) {
        query.status = { $in: req.query.status.split(',') }
    }

    if (!_.isNil(req.query.fromDate)) {
        query.end = { $gte: moment(req.query.fromDate).toDate() }
    }

    if (!_.isNil(req.query.toDate)) {
        query.start = { $lt: moment(req.query.toDate).toDate() }
    }
    
    if (_.isString(req.query.location)) {
        query.location = { $in: req.query.location.split(',') }
    }

    if (_.isString(req.query.course)) {
        query.course = { $in: req.query.course.split(',') }
    }
    
    if (_.isString(req.query.group)) {
        query.group = { $in: req.query.group.split(',') }
    }

    if (_.isString(req.query.teachers)) {
        query.teachers = { $in: req.query.teachers.split(',') }
    }

    if (_.isString(req.query.students)) {
        query.students = { $in: req.query.students.split(',') }
    }

    if (toBoolean(req.query.populateLocation)) {
        populateLocation = true
    }

    if (toBoolean(req.query.populateCourse)) {
        populateCourse = true
    }

    if (toBoolean(req.query.populateGroup)) {
        populateGroup = true
    }

    if (toBoolean(req.query.populateTeachers)) {
        populateTeachers = true
    }

    if (toBoolean(req.query.populateStudents)) {
        populateStudents = true
    }

    switch (req.state.activeRole) {
        case UserRole.teacher:
            query.teachers = req.state.user._id
            break
        case UserRole.student:
            query.students = req.state.user._id
            break
    }

    const lessons = await lessonsServices.getLessons(query, populateLocation, populateCourse, populateGroup, populateTeachers, populateStudents, req.state)
    return lessons
}

export async function postLessons(req: Request) {
    const lesson = await lessonsServices.createLesson(req.body, req.state)
    return lesson
}

export async function getLesson(req: Request) {
    const lesson = await lessonsServices.getLessonById(req.params.lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw errors.forbidden('Forbidden Lesson')
    }

    switch (req.state.activeRole) {
        case UserRole.teacher:
            if ((<any>lesson.teachers).map(teacherId => String(teacherId)).indexOf(String(req.state.user._id)) < 0) {
                throw errors.forbidden('Forbidden Lesson')
            }
        case UserRole.student:
            if ((<any>lesson.students).map(studentId => String(studentId)).indexOf(String(req.state.user._id)) < 0) {
                throw errors.forbidden('Forbidden Lesson')
            }
        default:
            break
    }

    return lesson
}

export async function putLesson(req: Request) {
    const lessonId = req.params.lessonId
    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) === String(req.state.school._id)) {
        const change = { $set: _.pick(req.body, ['status', 'group', 'course', 'location', 'teachers', 'students', 'name', 'start', 'end', 'vocabularyList', 'notes']) }
        return await lessonsServices.updateLessonById(lessonId, change, req.state)
    }

    throw errors.forbidden('Forbidden Lesson')
}
