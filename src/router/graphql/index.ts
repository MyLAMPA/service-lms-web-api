
import { Router } from 'express'
import * as graphqlHTTP from 'express-graphql'

import { authorizeRequest } from '../../middlewares'
import { schema as graphQLSchema } from '../../graphql/schema'

const router = Router()

router.use(authorizeRequest, graphqlHTTP({
    schema: graphQLSchema,
    graphiql: true,
}))

export { router }
