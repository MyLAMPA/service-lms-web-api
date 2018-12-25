
import { GraphQLEnumType } from 'graphql'

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

export const SchoolMembershipRoleEnum = new GraphQLEnumType({
    name: 'SchoolMembershipRole',
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
