
import { GraphQLEnumType } from 'graphql'

import {
    LessonStatus,
    LocationType,
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

export const LocationTypeEnum = new GraphQLEnumType({
    name: 'LocationType',
    values: {
        [LocationType.classroom]: { value: LocationType.classroom },
        [LocationType.remote]:    { value: LocationType.remote },
        [LocationType.online]:    { value: LocationType.online },
        [LocationType.other]:     { value: LocationType.other },
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

export const CEFLevelEnum = new GraphQLEnumType({
    name: 'CEFLevelEnum',
    values: {
        elementary: {
            value: 'elementary',
        },
        preintermediate: {
            value: 'preintermediate',
        },
        intermediate: {
            value: 'intermediate',
        },
        upperintermediate: {
            value: 'upperintermediate',
        },
        advanced: {
            value: 'advanced',
        },
        veryadvanced: {
            value: 'veryadvanced',
        },
    },
})

export const ActivitySkillEnum = new GraphQLEnumType({
    name: 'ActivitySkillEnum',
    values: {
        writing: {
            value: 'writing',
        },
        listening: {
            value: 'listening',
        },
        reading: {
            value: 'reading',
        },
        speaking: {
            value: 'speaking',
        },
    },
})
