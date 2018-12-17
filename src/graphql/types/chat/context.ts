
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
import { Model as MessageModel } from './message'
import * as messagesServices from '../../../services/chat/messages'
import * as chatContextServices from '../../../services/chat/context'

export const Context = new GraphQLObjectType({
    name: 'ChatContext',
    fields: {
        room: {
            type: RoomModel,
            async resolve(context, {}, { state }: Request) {
                const { room } = await chatContextServices.resolveChatContext(context, state)

                return room
            },
        },
        messages: {
            type: new GraphQLList(MessageModel),
            async resolve(context, {}, { state }: Request) {
                const { room } = await chatContextServices.resolveChatContext(context, state)

                const messages = await messagesServices.getMessagesByRoom(room._id, state)
                return messages
            },
        },
    },
})
