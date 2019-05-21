
import {
    GraphQLObjectType,
    GraphQLString,
} from 'graphql'

import { library } from './library'

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        library,
    },
})

export { mutation }
