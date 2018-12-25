
import { Request } from 'express'
import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInputObjectType,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'
import * as moment from 'moment'

import { Model as SchoolYearModel } from './schoolYear'
import * as schoolYearsServices from '../../../services/schoolYears'

export const TimeTableSettingsModel = new GraphQLObjectType({
    name: 'TimetableSettings',
    fields: {
        startHour: {
            type: GraphQLString,
            resolve(timetableSettings) {
                if (!_.isNil(timetableSettings.startHour)) {
                    return moment(timetableSettings.startHour).toISOString()
                }
                return null
            },
        },
        endHour: {
            type: GraphQLString,
            resolve(timetableSettings) {
                if (!_.isNil(timetableSettings.endHour)) {
                    return moment(timetableSettings.endHour).toISOString()
                }
                return null
            },
        },
    },
})

export const SchoolStatusEnum = new GraphQLEnumType({
    name: 'SchoolStatus',
    values: {
        trial: {
            value: 'trial',
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

export const Model = new GraphQLObjectType({
    name: 'School',
    fields: {
        id: {
            type: GraphQLString,
            resolve(school) {
                if (school._id) {
                    return String(school._id)
                }
                return null
            },
        },
        timetableSettings: {
            type: TimeTableSettingsModel,
        },
        status: {
            type: SchoolStatusEnum,
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
            async resolve(school, {}, { state }: Request) {
                if (typeof school.currentSchoolYear === 'string' || _.get(school.currentSchoolYear, '_bsontype') === 'ObjectID') {
                    const currentSchoolYear = await schoolYearsServices.getSchoolYearById(school.currentSchoolYear, state)
                    return currentSchoolYear
                }
                if (school.currentSchoolYear) {
                    return school.currentSchoolYear
                }
                return null
            },
        },
        schoolYears: {
            type: new GraphQLList(SchoolYearModel),
            async resolve(school, {}, { state }: Request) {
                const schoolYears = await schoolYearsServices.getSchoolYears({ school: school._id }, state)
                return schoolYears
            },
        },
    },
})
