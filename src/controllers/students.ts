
import { Request, Response } from 'express'

import * as studentsServices from '../services/students'

export async function getStudents(req: Request, res: Response) {
    const students = await studentsServices.getStudents({}, req.state)
    return students
}

export async function postStudents(req: Request, res: Response) {
    const student = await studentsServices.createStudent(req.body, req.state)
    return student
}

export async function getStudent(req: Request, res: Response) {
    const student = await studentsServices.getStudentById(req.params.studentId, req.state)
    return student
}

export async function putStudent(req: Request, res: Response) {
    const student = await studentsServices.updateStudentById(req.params.studentId, req.body, req.state)
    return student
}
