
import { GraphQLEnumType } from 'graphql'

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
        draft: {
            value: 'draft',
        },
        planned: {
            value: 'planned',
        },
        reported: {
            value: 'reported',
        },
        canceled: {
            value: 'canceled',
        },
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
