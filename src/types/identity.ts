
export type IDCtx = {
    accessId: string
    userId: string
}

export type JWTTokenData = {
    accessId: string
    userId: string
}

export type Credentials = {
    email?: string
    username?: string
    password: string
}

export type Access = {
    _id?: string
    isActive: boolean
    username: string
    password: string
    isGoogleConnected: boolean
    isFacebookConnected: boolean
    googleId: string
    facebookId: string
}

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
