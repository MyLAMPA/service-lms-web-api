
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { user } from './user'
import { lms } from './lms'
import { chat } from './chat'
import { myProfile } from './myProfile'

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        // myProfile,
        user,
        lms,
        chat,
    },
})

export { query }
