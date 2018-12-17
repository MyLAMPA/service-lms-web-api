
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

export const Model = new GraphQLObjectType({
    name: 'ChatRoom',
    fields: {
        id: {
            type: GraphQLString,
            resolve(chatRoom) {
                if (chatRoom._id) {
                    return String(chatRoom._id)
                }
                return null
            },
        },
        room: {
            type: GraphQLString,
        },
    },
})
