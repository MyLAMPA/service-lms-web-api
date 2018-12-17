
import {
    Router,
    Request,
    Response,
    NextFunction,
} from 'express'
import * as _ from 'lodash'

import { httpErrors as errors } from '../errors'
import { router as graphqlRouter } from './graphql'
import { router as apiRouter } from './api'

const router = Router()

router
    .use(async function (req: Request, res: Response, next: NextFunction) {
        res.set('Access-Control-Allow-Origin', '*')
        res.set('Access-Control-Allow-Headers', 'content-type, authorization, x-correlation-id')
        res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE, HEAD')
        next()
    })

router
    .route('*')
    .options(async function (req: Request, res: Response, next: NextFunction) {
        try {
            res.json({ status: 'ok' })
        } catch (ex) {
            next(ex)
        }
    })

router.use('/graphql', graphqlRouter)
router.use('/api', apiRouter)

router
    .route('*')
    .all(async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.state.out === undefined) {
                throw errors.notFound()
            }
            next()
        } catch (ex) {
            next(ex)
        }
    })

export { router }
