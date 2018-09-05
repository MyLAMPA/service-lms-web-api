
import { Request, Response } from 'express'

import * as teachersServices from '../services/teachers'

export async function getTeachers(req: Request, res: Response) {
    const teachers = await teachersServices.getTeachers({}, req.state)
    return teachers
}

export async function postTeachers(req: Request, res: Response) {
    const teacher = await teachersServices.createTeacher(req.body, req.state)
    return teacher
}

export async function getTeacher(req: Request, res: Response) {
    const teacher = await teachersServices.getTeacherById(req.params.teacherId, req.state)
    return teacher
}

export async function putTeacher(req: Request, res: Response) {
    const teacher = await teachersServices.updateTeacherById(req.params.teacherId, req.body, req.state)
    return teacher
}
