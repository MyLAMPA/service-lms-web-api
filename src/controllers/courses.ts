
import { Request, Response } from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import {
    UserRole,
} from '../models'
import * as coursesServices from '../services/courses'

export async function getCourses(req: Request, res: Response) {
    let query = null

    switch (req.state.activeRole) {
        case UserRole.admin:
        case UserRole.teacher:
            query = { school: req.state.school._id }
            break
        default:
            throw errors.forbidden('Forbidden Courses')
    }

    const courses = await coursesServices.getCourses(query, req.state)
    return courses
}

export async function postCourses(req: Request, res: Response) {
    const course = await coursesServices.createCourse(req.body, req.state)
    return course
}

export async function getCourse(req: Request, res: Response) {
    switch (req.state.activeRole) {
        case UserRole.admin:
        case UserRole.teacher:
            const course = await coursesServices.getCourseById(req.params.courseId, req.state)
            if (String(course.school) === String(req.state.school._id)) {
                return course
            }
        default:
            break
    }

    throw errors.forbidden('Forbidden Course')
}

export async function putCourse(req: Request, res: Response) {
    const courseId = req.params.courseId
    const course = await coursesServices.getCourseById(courseId, req.state)
    
    if (String(course.school) === String(req.state.school._id)) {
        const change = { $set: _.pick(req.body, ['name', 'abbr', 'description', 'color']) }
        return await coursesServices.updateCourseById(courseId, change, req.state)
    }

    throw errors.forbidden('Forbidden Course')
}
