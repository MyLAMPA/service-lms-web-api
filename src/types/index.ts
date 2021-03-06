
import * as Logger from 'bunyan'
import * as mysql from 'mysql'

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
    userSubscriptionsCtx?: UserSubscriptionsCtx
}

// Security models

export type PrivacyPolicy = {
    lmsOwner?: string // string|LmsContext
    isPublic?: boolean
}

// Contexts

export type IDCtx = {
    userId: number
    primaryEmailAddress: string
    emailAddresses: string[]
    virtual?: boolean
}

export type LMSCtx = {
    contextId: string
    role: LmsContextMembershipRole
    membershipId: string
    userId: number
    studentId: string
    teacherId: string
}

export type UserSubscriptionsCtx = {
    activeSubscriptionProducts: {
        skuId: string
        name: string
    }[]
}

// GraphQL type

export type Edges<Edge> = {
    edges: Edge[]
    edgesTotal: number
    pagination: {
        cursor: string
        nextCursor: string
        previousCursor?: string
    }
}

// Entities

export type EmailAddress = {
    id: string
    email: string
    userId: number
    isVerified: boolean
}

export type Image = {
    _id: string
    createdAt: Date
    createdBy: number
    file: {
        key?: string
        fileKey: string
    }
    title?: string
    description?: string
    tags?: {
        key: string
        name?: string
        text: string
    }[]
}



export type LmsContextMembership = {
    _id?: string
    emailAddress: string
    //userId: number
    role: LmsContextMembershipRole
    lmsContext: string // string|Context
    teacher: string // string|Teacher
    student: string // string|Student
}

export type LmsContext = {
    _id?: string
    status: LmsContextStatus
    mode: LmsContextMode
    createdAt: Date
    linkedSchoolId: number
    // billingInfo: string // string|BillingInfo
    name: string
    abbr: string
    externalWebUrl: string // ?
    defaultLessonDuration: number
    currentSchoolYear: string // string|SchoolYear
    timetableSettings: {
        startHour: Date
        endHour: Date
    }
}

export type SchoolYear = {
    _id?: string
    context: string // string|Context
    title: string
    start: Date
    end: Date
}

export type Student = {
    _id?: string
    context: string // string|Context
    fullName: string
    color: string
}

export type Teacher = {
    _id?: string
    context: string // string|Context
    firstName: string
    lastName: string
    abbr: string
    color: string
}

export type Location = {
    _id?: string
    context: string // string|Context
    type: LocationType
    name: string
    abbr: string
    description: string
    capacity: number
    color: string
    equipment: string[] // string[]|LocationEquipment[]
}

export type LocationEquipment = {
    _id?: string
    context: string // string|Context
    title: string
    description: string
}

export type Course = {
    _id?: string
    context: string // string|Context
    name: string
    abbr: string
    description: string
    color: string
}

export type Group = {
    _id?: string;
    context: string // string|Context
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
    context: string // string|Context
    dueLesson: string // string|Lesson
    originLesson: string // string|Lesson
    title: string
    assignment: string
    isDone: boolean
}

export type Lesson = {
    _id?: string
    context: string // string|Context
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

export enum BucketFolder {
    images = 'images',
}

export enum SkuId {
    lmsForFreelancers = 'LMSF',
    lmsForSchools = 'LMSS',
}

export enum ProductName {
    libraryNoLimit = 'LIBRARY_NO_LIMIT',
}

export enum LmsContextMembershipRole {
    freelancer = 'freelancer',
    student = 'student',
    teacher = 'teacher',
    admin = 'admin',
}

export enum LmsContextStatus {
    freetrial = 'freetrial',
    active = 'active',
    suspended = 'suspended',
    archived = 'archived',
}

export enum LmsContextMode {
    freelancer = 'freelancer',
    school = 'school',
}

export enum LocationType {
    classroom = 'classroom',
    remote = 'remote',
    online = 'online',
    other = 'other',
}

export enum LessonStatus {
    scheduled = 'scheduled',
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
