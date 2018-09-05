
import * as Logger from 'bunyan'
import { Document } from 'mongoose'

export type Partial<T> = {
    [P in keyof T]?: T[P];
};

export type State = {
    correlationId?: string;
    logger?: Logger;
    out?: any;
    access?: Access;
    user?: User;
    school?: School;
    activeRole?: UserRole;
};

export type TokenBody = {
    accessId: string;
    activeRole: UserRole;
};

export type Credentials = {
    email?: string;
    username?: string;
    password: string;
};

export type Access = {
    _id?: string;
    isActive: boolean;
    username: string;
    password: string;
    isConnectedToGoogle: boolean;
    isConnectedToFacebook: boolean;
    googleId: string;
    facebookId: string;
};

export type BaseUser = {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    abbr?: string;
    color?: string;
};

export type User = BaseUser & {
    _id?: string;
    access: string|Access;
    school: string|School;
    roles: UserRole[];
    defaultActiveRole: UserRole;
};

export type Teacher = BaseUser & {
    _id?: string;
    access: string|Access;
    abbr: string;
};

export type Student = BaseUser & {
    _id?: string;
    access: string|Access;
};

export type Client = {
    type: ClientType;
    name: string;
    company: string;
    cin: string;
    vat: string;
    currency: string|Currency;
    email: string;
    mobile: string;
    address: string;
    city: string;
    zip: string;
    birthDate: Date;
};

export type Currency = {
    _id?: string
}

export type SubscriptionPlan = {
    _id?: string
}

export type Subscription = {
    _id?: string
    type: SubscriptionType
    tier: SubscriptionTier
    expirationDate: Date
    purchaseDate: Date
    originalPurchaseDate: Date
}

export type School = {
    _id?: string;
    createdAt: Date;
    name: string;
    abbr: string;
    email: string;
    mobile: string;
    externalWebUrl: string;
    defaultLessonDuration: number;
    currentSchoolYear: string|SchoolYear;
    timetableSettings: SchoolTimetableSettings;
};

export type SchoolTimetableSettings = {
    startHour: Date;
    endHour: Date;
};

export type SchoolYear = {
    _id?: string;
    school: string|School;
    title: string;
    start: Date;
    end: Date;
};

export type Location = {
    _id?: string;
    school: string|School;
    name: string;
    abbr: string;
    description: string;
    capacity: number;
    color: string;
    equipment: string[]|LocationEquipment[];
};

export type LocationEquipment = {
    _id?: string;
    school: string|School;
    title: string;
    description: string;
};

export type Course = {
    _id?: string;
    school: string|School;
    name: string;
    abbr: string;
    description: string;
    color: string;
};

export type Group = {
    _id?: string;
    school: string|School;
    course: string|Course;
    name: string;
    abbr: string;
    description: string;
    capacity: number;
    students: string[]|Student[];
    color: string;
};

export type BaseLesson = {
    school?: string
    group: string
    course: string
    location: string
    teachers: string[]
    students: string[]
    start: Date
    end: Date
    status: LessonStatus
    lessonPlan: BaseLessonPlan
    activities: string[]
    vocabularyList: string[]
    teachersNotes: BaseLessonTeachersNote[]
    notes: string
    attendance: BaseLessonAttendance[]
    outcomes: BaseLessonOutcome[]
}

export type BaseLessonPlan = {
    title: string
    outcomes: BaseOutcome[]
    topic?: string
    focus?: string
    materials?: string
}

export type BaseOutcome = {
    key: string
    createdBy?: string
    content: string
    parentActivity?: string
    parentLessonPlanTemplate?: string
}

export type Outcome = BaseOutcome & {
    createdBy: string|BaseUser
    parentActivity?: string|BaseLessonActivity
    parentLessonPlanTemplate?: string|BaseLessonPlanTemplate
}

export type BaseLessonTeachersNote = {
    createdAt: Date
    createdBy: string
    content: string
}

export type BaseLessonAttendance = {
    student: string
    status: AttendanceStatus
    absentTime: number
    note: string
}

export type BaseLessonOutcome = {
    key?: string
    createdAt?: Date
    createdBy?: string
    content: string
}

export type Lesson = BaseLesson & {
    _id?: string
    school: string|School
    group: string|Group
    course: string|Course
    location: string|Location
    teachers: string[]|Teacher[]
    students: string[]|Student[]
    attendance: LessonAttendance[]
    teachersNotes: LessonTeachersNote[]
    activities: string[]|BaseLessonActivity[]
    outcomes: BaseOutcome[]|Outcome[]
}

export type LessonOutcome = BaseLessonOutcome & {
    createdBy?: string|User
}

export type LessonTeachersNote = BaseLessonTeachersNote & {
    createdBy: string|User
}

export type LessonAttendance = BaseLessonAttendance & {
    student: string|Student
}

export type BaseLessonPlanTemplate = BaseLessonPlan & {
    _id?: string
    school?: string
    createdAt: Date
    createdBy: string
    level: CEFLevel[]
    recomendedAge: LessonPlanTemplateRecomendedAge[]
    isSchoolVisible: boolean
    isCommunityVisible: boolean
}

export type LessonPlanTemplate = BaseLessonPlanTemplate & {
    school?: string|School
    createdBy: string|User
}

export enum SharedItemSource {
    own = 'own',
    school = 'school',
    community = 'community',
}

export enum CEFLevel {
    elementary = 'elementary',
    preIntermediate = 'preIntermediate',
    intermediate = 'intermediate',
    upperIntermediate = 'upperIntermediate',
    advanced = 'advanced',
    veryAdvanced = 'veryAdvanced',
}

export enum LessonPlanTemplateRecomendedAge {
    children = 'children',
    youth = 'youth',
    adults = 'adults',
}

export type BaseLessonActivity = {
    _id?: string
    school?: string
    createdAt: Date
    createdBy: string
    tags: string[]
    category: LessonActivityCategory
    title: string
    topic: string
    focus: string
    isRepeatable: boolean
    skills: LessonActivitySkill[]
    level: CEFLevel[]
    materials: string
    preparation: string
    instructions: string
    duration: number
    durationMax: number
    isSchoolVisible: boolean
    isCommunityVisible: boolean
}

export type LessonActivity = BaseLessonActivity & {
    school?: string|School
    createdBy: string|User
}

export enum LessonActivityCategory {
    other = 'other',
    gamesPuzzles = 'gamesPuzzles',
    storiesSongsPoetryProse = 'storiesSongsPoetryProse',
    discussionDebates = 'discussionDebates',
    presentationsDemonstrations = 'presentationsDemonstrations',
    worksheetsTestsQuizzes = 'worksheetsTestsQuizzes',
    drillsDictations = 'drillsDictations',
}

export enum LessonActivitySkill {
    writing = 'writing',
    listening = 'listening',
    reading = 'reading',
    speaking = 'speaking',
}

// export type Dictionary = {
//     _id?: string
// 
// }
// 
// export type VocabularyListWord = {
//     _id?: string
// }
// 
// export type Word = {
//     _id?: string
//     createdAt: Date
//     content: string
//     translation: string
//     score: number
// }

export type BaseHomework = {
    _id?: string
    school?: string
    dueLesson: string
    originLesson: string
    title: string
    assignment: string
    isDone: boolean
}

export type Homework = BaseHomework & {
    school?: string|School
    dueLesson: string|Lesson
    originLesson: string|Lesson
}

export type EmailAttachement = {
    filename: string
    path: string
}

export type EmailSender = {
    name: string
    address: string
}

export type AccessDocument = Access & Document;
export type UserDocument = User & Document;
export type ClientDocument = Client & Document;
export type CurrencyDocumet = Currency & Document;
export type SubscriptionDocument = Subscription & Document;
export type SchoolDocument = School & Document;
export type SchoolYearDocument = SchoolYear & Document;
export type LocationDocument = Location & Document;
export type LocationEquipmentDocument = LocationEquipment & Document;
export type CourseDocument = Course & Document;
export type GroupDocument = Group & Document;
export type LessonDocument = Lesson & Document;
export type HomeworkDocument = Homework & Document;
export type LessonPlanTemplateDocument = LessonPlanTemplate & Document;
export type LessonActivityDocument = LessonActivity & Document;

export enum CRUD {
    create = 'create',
    read = 'read',
    update = 'update',
    delete = 'delete',
};

export enum UserRole {
    admin = 'admin',
    teacher = 'teacher',
    student = 'student',
};

export enum LessonStatus {
    draft = 'draft',
    planned = 'planned',
    reported = 'reported',
    canceled = 'canceled',
};

export enum AttendanceStatus {
    present = 'present',
    absent = 'absent',
    excused = 'excused',
};

export enum ClientType {
    person = 'person',
    company = 'company',
};

export enum SubscriptionTier {
    tier1 = 'tier1',
};

export enum SubscriptionType {
    school = 'school',
    teacher = 'teacher',
    student = 'student',
};
