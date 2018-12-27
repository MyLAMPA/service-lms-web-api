
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

import { subscriptions } from '../../resolvers/lms/subscriptions'
import { context } from '../../resolvers/lms/context'
import { schoolYears } from '../../resolvers/lms/schoolYears'
import { course, courses } from '../../resolvers/lms/course'
import { group, groups } from '../../resolvers/lms/group'
import { lesson } from '../../resolvers/lms/lesson'
import { location, locations } from '../../resolvers/lms/location'
import { locationEquipment, locationEquipments } from '../../resolvers/lms/locationEquipment'
import { student, students } from '../../resolvers/lms/student'
import { teacher, teachers } from '../../resolvers/lms/teacher'
import * as schoolYearsServices from '../../../services/schoolYears'
import { ContextStatusEnum } from '../enums'
import { Model as SchoolYearModel } from './schoolYear'

// import * as messagesServices from '../../../services/chat/messages'
// import * as chatContextServices from '../../../services/chat/context'

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
    name: 'Context',
    fields: {
        id: {
            type: GraphQLString,
            resolve: ({ _id }) => _id ? String(_id) : null,
        },
        timetableSettings: {
            type: TimetableSettingsModel,
        },
        status: {
            type: ContextStatusEnum,
        },
        createdAt: {
            type: GraphQLString,
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
            async resolve(lmsContext, {}, { state }: Request) {
                if (typeof lmsContext.currentSchoolYear === 'string' || _.get(lmsContext.currentSchoolYear, '_bsontype') === 'ObjectID') {
                    const currentSchoolYear = await schoolYearsServices.getSchoolYearById(lmsContext.currentSchoolYear, state)
                    return currentSchoolYear
                }
                if (lmsContext.currentSchoolYear) {
                    return lmsContext.currentSchoolYear
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

export const LMSContext = new GraphQLObjectType({
    name: 'LMSContext',
    fields: {
        context, subscriptions,
        schoolYears,
        course, courses,
        group, groups,
        lesson,
        location, locations,
        locationEquipment, locationEquipments,
        student, students,
        teacher, teachers,
    },
})
