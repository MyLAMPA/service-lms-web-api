
import { Router } from 'express'
import * as graphqlHTTP from 'express-graphql'

import { authorizeUserRequest } from '../../middlewares'
import { schema as graphQLSchema } from '../../graphql/schema'

const router = Router()

router.use(authorizeUserRequest, graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
}))

export { router }
