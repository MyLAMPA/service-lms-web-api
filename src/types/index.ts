
import * as Logger from 'bunyan'

// Application/Utils

export type Partial<T> = {
    [P in keyof T]?: T[P]
}

export type State = {
    correlationId?: string
    logger?: Logger
    out?: any
    idCtx?: IDCtx
    lmsCtx?: LMSCtx
}

// Contexts

export type IDCtx = {
    userId: number
}

export type LMSCtx = {
    role: SchoolMembershipRole
    membershipId: string
    schoolId: string
    userId: number
    studentId: string
    teacherId: string
}

// Entities

export type SchoolMembership = {
    _id?: string
    user: number
    school: string // string|School
    role: SchoolMembershipRole
    teacher: string // string|Tea cher
    student: string // string|Student
}

export type School = {
    _id?: string
    timetableSettings: {
        startHour: Date
        endHour: Date
    }
    status: SchoolStatus
    createdAt: Date
    // billingInfo: string // string|BillingInfo
    name: string
    abbr: string
    externalWebUrl: string
    defaultLessonDuration: number
    currentSchoolYear: string // string|SchoolYear
}

export type SchoolYear = {
    _id?: string
    school: string // string|School
    title: string
    start: Date
    end: Date
}

export type Student = {
    _id?: string
    school: string // string|School
    firstName: string
    lastName: string
    color: string
}

export type Teacher = {
    _id?: string
    school: string // string|School
    firstName: string
    lastName: string
    abbr: string
    color: string
}

export type Location = {
    _id?: string
    school: string // string|School
    name: string
    abbr: string
    description: string
    capacity: number
    color: string
    equipment: string[] // string[]|LocationEquipment[]
}

export type LocationEquipment = {
    _id?: string
    school: string // string|School
    title: string
    description: string
}

export type Course = {
    _id?: string
    school: string // string|School
    name: string
    abbr: string
    description: string
    color: string
}

export type Group = {
    _id?: string;
    school: string // string|School
    course: string // string|Course
    name: string
    abbr: string
    description: string
    capacity: number
    students: string[] // string[]|Student[]
    color: string
}

export type Homework = {
    _id?: string
    school: string // string|School
    dueLesson: string // string|Lesson
    originLesson: string // string|Lesson
    title: string
    assignment: string
    isDone: boolean
}

export type Lesson = {
    _id?: string
    school: string // string|School
    group: string // string|Group
    course: string // string|Course
    location: string // string|Location
    teacher: string // string|Teacher
    students: string[] // string[]|Student[]
    start: Date
    end: Date
    status: LessonStatus
    lessonPlan: {
        title: string
        topic: string
        focus: string
        materials: string
    }
    notes: string
    attendance: {
        student: string // string|Student
        status: AttendanceStatus
        absentTime: number
        note: string
    }[]
}

// Enums

export enum SchoolMembershipRole {
    student = 'student',
    teacher = 'teacher',
    admin = 'admin',
}

export enum LessonStatus {
    draft = 'draft',
    planned = 'planned',
    reported = 'reported',
    canceled = 'canceled',
}

export enum AttendanceStatus {
    present = 'present',
    absent = 'absent',
    excused = 'excused',
}

export enum SchoolStatus {
    freetrial = 'freetrial',
    active = 'active',
    suspended = 'suspended',
    archived = 'archived',
}
