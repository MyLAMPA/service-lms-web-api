
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { identity } from './identity'
import { library } from './library'
import { lms } from './lms'
import { user } from './user'
// import { chat } from './chat'

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        identity,
        library,
        lms,
        user,
        // chat,
    },
})

export { query }
