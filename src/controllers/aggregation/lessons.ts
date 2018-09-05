
import { Request, Response } from 'express'
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors } from '../../errors'
import {
    Lesson,
    Group,
    Teacher,
    Course,
    Location,
} from '../../models'
import {
    LessonDetail,
    LessonCourseDetail,
    LessonGroupDetail,
    LessonLocationDetail,
    LessonTeacherDetail,
    LessonStudentDetail,
    AggregatedLessonAttendance,
} from '../../models/aggregation'
import * as lessonsServices from '../../services/lessons'
import * as coursesServices from '../../services/courses'
import * as groupsServices from '../../services/groups'
import * as teachersServices from '../../services/teachers'
import * as studentsServices from '../../services/students'
import * as locationsServices from '../../services/locations'

export async function getLessonDetail(req: Request, res: Response) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)

    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    let courseDetail: LessonCourseDetail = null
    if (lesson.course) {
        const course = await coursesServices.getCourseById(lesson.course, req.state)
        courseDetail = {
            courseId: course._id,
            name: course.name,
            abbr: course.abbr,
            color: course.color,
        }
    }

    let groupDetail: LessonGroupDetail = null
    if (lesson.group) {
        const group = await groupsServices.getGroupById(lesson.group, req.state)
        const nextLesson = await lessonsServices.getNextLesson({ group: String(group._id) }, lesson.start, req.state)
        const previousLesson = await lessonsServices.getPreviousLesson({ group: String(group._id) }, lesson.start, req.state)
        groupDetail = {
            groupId: group._id,
            name: group.name,
            abbr: group.abbr,
            description: group.description,
            color: group.color,
            previousLesson: _.isObject(previousLesson) ? previousLesson._id : null,
            nextLesson: _.isObject(nextLesson) ? nextLesson._id : null,
        }
    }

    let locationDetail: LessonLocationDetail = null
    if (lesson.location) {
        const location = await locationsServices.getLocationById(lesson.location, req.state)
        const nextLesson = await lessonsServices.getNextLesson({ location: String(location._id) }, lesson.start, req.state)
        const previousLesson = await lessonsServices.getPreviousLesson({ location: String(location._id) }, lesson.start, req.state)
        locationDetail = {
            locationId: location._id,
            name: location.name,
            abbr: location.abbr,
            color: location.color,
            previousLesson: _.isObject(previousLesson) ? previousLesson._id : null,
            nextLesson: _.isObject(nextLesson) ? nextLesson._id : null,
        }
    }

    let teachersDetails: LessonTeacherDetail[] = []
    if (_.isArray(lesson.teachers) && lesson.teachers.length >= 1) {
        for (const i in lesson.teachers) {
            const teacher = await teachersServices.getTeacherById(String(lesson.teachers[i]), req.state)
            const nextLesson = await lessonsServices.getNextLesson({ teachers: String(teacher._id) }, lesson.start, req.state)
            const previousLesson = await lessonsServices.getPreviousLesson({ teachers: String(teacher._id) }, lesson.start, req.state)
            const teacherDetail: LessonTeacherDetail = {
                teacherId: teacher._id,
                name: teacher.name,
                abbr: teacher.abbr,
                color: teacher.color,
                previousLesson: _.isObject(previousLesson) ? previousLesson._id : null,
                nextLesson: _.isObject(nextLesson) ? nextLesson._id : null,
            }
            teachersDetails.push(teacherDetail)
        }
    }

    let studentsDetails: LessonStudentDetail[] = []
    if (_.isArray(lesson.students) && lesson.students.length >= 1) {
        for (const i in lesson.students) {
            const student = await studentsServices.getStudentById(String(lesson.students[i]), req.state)
            const studentDetail: LessonStudentDetail = {
                studentId: student._id,
                name: student.name,
            }
            studentsDetails.push(studentDetail)
        }
    }

    const lessonDetails: LessonDetail = {
        lessonId: lesson._id,
        status: lesson.status,
        start: lesson.start,
        end: lesson.end,
        duration: moment.duration(moment(lesson.end).diff(moment(lesson.start))).asMinutes(),
        course: courseDetail,
        group: groupDetail,
        teachers: teachersDetails,
        students: studentsDetails,
        location: locationDetail,
    }

    return lessonDetails
}

export async function getLessonAttendance(req: Request, res: Response) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)
    
    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const attendance = await lessonsServices.getLessonAttendance(lessonId, req.state)

    const lessonAttendance: AggregatedLessonAttendance[] = []

    if (_.isArray(attendance)) {
        for (const i in attendance) {
            const { student, status, absentTime, note } = attendance[i]
            const { _id, name } = await studentsServices.getStudentById(student, req.state)
            lessonAttendance.push({
                status, absentTime, note,
                student: { name, studentId: _id },
            })
        }
    }

    if (_.isArray(lesson.students)) {
        const studentIds = _.filter(lesson.students, student => !_.find(attendance, { student }))
        for (const i in studentIds) {
            const studentId = studentIds[i]
            const { name } = await studentsServices.getStudentById(studentId, req.state)
            lessonAttendance.push({
                status: null,
                absentTime: null,
                note: null,
                student: { name, studentId },
            })
        }
    }

    return lessonAttendance
}

export async function getLessonTeachersNotes(req: Request, res: Response) {
    const lessonId = req.params.lessonId

    const lesson = await lessonsServices.getLessonById(lessonId, req.state)
    
    if (String(lesson.school) !== String(req.state.school._id)) {
        throw httpErrors.forbidden('Forbidden Lesson')
    }

    const teachersNotes = await lessonsServices.getLessonTeachersNotes(lessonId, req.state)
    return teachersNotes
}
