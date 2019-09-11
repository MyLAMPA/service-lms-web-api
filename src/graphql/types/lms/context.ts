
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

import {
    LMSCtx,
    LmsContextMembershipRole,
} from '../../../types'
import * as schoolYearsServices from '../../../services/lms/schoolYears'
import * as subscriptionsServices from '../../../services/subscriptions'
import { LMSContextStatusEnum, LMSContextModeEnum } from '../enums'
import { Model as SubscriptionModel } from '../subscription'
import { Model as SchoolYearModel } from './schoolYear'

export const TimetableSettingsModel = new GraphQLObjectType({
    name: 'TimetableSettings',
    fields: {
        startHour: {
            type: GraphQLString,
            resolve: ({ startHour }) => !_.isNil(startHour) ?
                moment(startHour).toISOString() : null,
        },
        endHour: {
            type: GraphQLString,
            resolve: ({ endHour }) => !_.isNil(endHour) ?
                moment(endHour).toISOString() : null,
        },
    },
})

export const Model = new GraphQLObjectType({
    name: 'LMS_Context',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        subscriptions: {
            type: new GraphQLList(SubscriptionModel),
            async resolve({ contextId, role }: LMSCtx, {}, { state }: Request) {
                let subscriptions = []

                if (state.lmsCtx.role === LmsContextMembershipRole.freelancer || state.lmsCtx.role === LmsContextMembershipRole.admin) {
                    subscriptions = await subscriptionsServices.getSubscriptionsByLmsContext(contextId, state)
                }

                return subscriptions
            },
        },
        status: {
            type: LMSContextStatusEnum,
        },
        mode: {
            type: LMSContextModeEnum,
        },
        createdAt: {
            type: GraphQLString,
        },
        timetableSettings: {
            type: TimetableSettingsModel,
        },
        name: {
            type: GraphQLString,
        },
        abbr: {
            type: GraphQLString,
        },
        externalWebUrl: {
            type: GraphQLString,
        },
        defaultLessonDuration: {
            type: GraphQLInt,
        },
        currentSchoolYear: {
            type: SchoolYearModel,
            async resolve({ currentSchoolYear }, {}, { state }: Request) {
                if (typeof currentSchoolYear === 'string' || _.get(currentSchoolYear, '_bsontype') === 'ObjectID') {
                    return await schoolYearsServices.getSchoolYearById(currentSchoolYear, state)
                }
                if (currentSchoolYear) {
                    return currentSchoolYear
                }
                return null
            },
        },
        schoolYears: {
            type: new GraphQLList(SchoolYearModel),
            async resolve({ _id: context }, {}, { state }: Request) {
                const schoolYears = await schoolYearsServices.getSchoolYears({ context }, state)
                return schoolYears
            },
        },
    },
})
