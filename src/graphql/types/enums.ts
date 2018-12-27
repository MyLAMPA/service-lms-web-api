
import { GraphQLEnumType } from 'graphql'

export const ContextStatusEnum = new GraphQLEnumType({
    name: 'SchoolStatus',
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

export const ContextMembershipRoleEnum = new GraphQLEnumType({
    name: 'ContextMembershipRole',
    values: {
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
