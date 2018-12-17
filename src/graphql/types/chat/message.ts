
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

import { Model as RoomModel } from './room'

export const Model = new GraphQLObjectType({
    name: 'ChatMessage',
    fields: {
        id: {
            type: GraphQLString,
            resolve(chatMessage) {
                if (chatMessage._id) {
                    return String(chatMessage._id)
                }
                return null
            },
        },
        room: {
            type: RoomModel,
            async resolve() {},
        },
        content: {
            type: GraphQLString,
        },
    },
})
