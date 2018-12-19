
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

import { school } from '../../resolvers/lms/school'
import { schoolYears } from '../../resolvers/lms/schoolYears'
import { course, courses } from '../../resolvers/lms/course'
import { group, groups } from '../../resolvers/lms/group'
import { lesson } from '../../resolvers/lms/lesson'
import { location, locations } from '../../resolvers/lms/location'
import { locationEquipment, locationEquipments } from '../../resolvers/lms/locationEquipment'
import { student, students } from '../../resolvers/lms/student'
import { teacher, teachers } from '../../resolvers/lms/teacher'

import { Model as SchoolModel } from './school'
// import * as messagesServices from '../../../services/chat/messages'
// import * as chatContextServices from '../../../services/chat/context'

export const Context = new GraphQLObjectType({
    name: 'LMSContext',
    fields: {
        school,
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
