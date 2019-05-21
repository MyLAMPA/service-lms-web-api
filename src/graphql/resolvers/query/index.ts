
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { identity } from './identity'
import { library } from './library'
import { lms } from './lms'
// import { chat } from './chat'

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        identity,
        library,
        lms,
        // chat,
    },
})

export { query }
