
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { room } from './room'
import { message } from './message'

const Chat = new GraphQLObjectType({
    name: 'Chat',
    fields: {
        room,
        message,
    },
})

const chat = {
    type: Chat,
    resolve(source, {}, ctx: Request) {
        return {}
    },
}

export { chat }
