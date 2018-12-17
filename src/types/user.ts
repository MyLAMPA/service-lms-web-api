
export type SchoolMembership = {
    _id?: string
    user: string // string|User
    school: string // string|School
    role: SchoolMembershipRole
}

export enum SchoolMembershipRole {
    student = 'student',
    teacher = 'teacher',
    admin = 'admin',
}
