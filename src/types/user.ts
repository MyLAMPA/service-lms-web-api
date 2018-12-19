
export type User = {
    _id?: string
    access: string // string|Access
    email: string
    firstName: string
    lastName: string
}

export type SchoolMembership = {
    _id?: string
    user: string // string|User
    school: string // string|School
    role: SchoolMembershipRole
    teacher: string // string|Tea cher
    student: string // string|Student
}

export enum SchoolMembershipRole {
    student = 'student',
    teacher = 'teacher',
    admin = 'admin',
}
