
import { GraphQLEnumType } from 'graphql'

import {
    LessonStatus,
} from '../../types'

export const LMSContextStatusEnum = new GraphQLEnumType({
    name: 'LMSContextStatus',
    values: {
        freetrial: {
            value: 'freetrial',
        },
        active: {
            value: 'active',
        },
        suspended: {
            value: 'suspended',
        },
        archived: {
            value: 'archived',
        },
    },
})

export const LMSContextModeEnum = new GraphQLEnumType({
    name: 'LMSContextMode',
    values: {
        freelancer: {
            value: 'freelancer',
        },
        school: {
            value: 'school',
        },
    },
})

export const LMSContextMembershipRoleEnum = new GraphQLEnumType({
    name: 'LMSContextMembershipRole',
    values: {
        freelancer: {
            value: 'freelancer',
        },
        student: {
            value: 'student',
        },
        teacher: {
            value: 'teacher',
        },
        admin: {
            value: 'admin',
        },
    },
})

export const LessonStatusEnum = new GraphQLEnumType({
    name: 'LessonStatus',
    values: {
        [LessonStatus.scheduled]: { value: LessonStatus.scheduled },
        [LessonStatus.draft]:     { value: LessonStatus.draft },
        [LessonStatus.planned]:   { value: LessonStatus.planned },
        [LessonStatus.reported]:  { value: LessonStatus.reported },
        [LessonStatus.canceled]:  { value: LessonStatus.canceled },
    },
})

export const SubscriptionStatusEnum = new GraphQLEnumType({
    name: 'SubscriptionStatusEnum',
    values: {
        pending: {
            value: 'pending',
        },
        active: {
            value: 'active',
        },
        canceled: {
            value: 'canceled',
        },
    },
})
