
import { SchoolMembershipRole } from './user'

export type LMSCtx = {
    role: SchoolMembershipRole
    membershipId: string
    schoolId: string
    userId: string
    studentId: string
    teacherId: string
}

export type Student = {
    school: string // string|School
    firstName: string
    lastName: string
    color: string
}

export type Teacher = {
    school: string // string|School
    firstName: string
    lastName: string
    abbr: string
    color: string
}
