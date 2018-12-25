
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

import { SchoolMembershipRoleEnum } from '../enums'
import { Model as SchoolModel } from '../lms/school'
import * as schoolsServices from '../../../services/schools'

export const Model = new GraphQLObjectType({
    name: 'SchoolMembership',
    fields: {
        id: {
            type: GraphQLString,
            resolve(schoolMembership) {
                if (schoolMembership._id) {
                    return String(schoolMembership._id)
                }
                return null
            },
        },
        school: {
            type: SchoolModel,
            async resolve(schoolMembership, {}, { state }: Request) {
                if (typeof schoolMembership.school === 'string' || _.get(schoolMembership.school, '_bsontype') === 'ObjectID') {
                    const school = await schoolsServices.getSchoolById(schoolMembership.school, false, state)
                    return school
                }
                if (schoolMembership.school) {
                    return schoolMembership.school
                }
                return null
            },
        },
        role: {
            type: SchoolMembershipRoleEnum,
        },
    },
})
