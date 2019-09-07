
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

import {
    Model as ImageModel,
} from '../image'
import * as imagesServices from '../../../services/images'

export const Model = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {
            type: GraphQLInt,
            resolve: user => _.isNil(user.id) ? null : user.id,
        },
        username: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        name: {
            type: GraphQLString,
        },
        fullName: {
            type: GraphQLString,
            resolve: async(user) =>
                `${user.firstName} ${user.lastName}`,
        },
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        profileImage: {
            type: ImageModel,
            resolve: async(user, {}, { state }: Request) => {
                if (typeof user.profileImage === 'string') {
                    const image = await imagesServices.getImageById(user.profileImage, state)
                    return image
                }
                if (!_.isEmpty(user.profileImage)) {
                    return user.profileImage
                }
                return null
            },
        },
    },
})
