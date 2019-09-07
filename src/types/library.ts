
import {
    Partial,
    PrivacyPolicy,
} from '.'
import {
    User,
} from './identity'

export interface Subject {
    _id?: string
    childOf: string // string|Subject
    title: string
    description: string
    icon: string
}

export interface LessonPlan {
    _id?: string
    createdAt: Date
    createdBy: number
    slug?: string
    subject: string // string|Subject
    cefLevel: CEFLevel[]
    recomendedAge: RecomendedAge[]
    title: string
    materials: string
    tags: {
        key: string
        name: string
        text: string
    }[]
}

export interface Document {
    json: string
    text?: string
    html?: string
}

export interface Activity {
    _id?: string
    createdAt: Date
    createdBy: number
    slug?: string
    privacyPolicy: PrivacyPolicy
    title: string
    procedure: Document
    duration?: number
    isRepeatable?: boolean
    tags: {
        key: string
        name: string
        text: string
    }[]
}

export enum CEFLevel {
    elementary = 'elementary',
    preIntermediate = 'preIntermediate',
    intermediate = 'intermediate',
    upperIntermediate = 'upperIntermediate',
    advanced = 'advanced',
    veryAdvanced = 'veryAdvanced',
}

export enum RecomendedAge {
    children = 'children',
    youth = 'youth',
    adults = 'adults',
}
