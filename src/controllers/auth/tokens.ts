
import { Request, Response } from 'express'
import * as _ from 'lodash'

import * as authServices from '../../services/auth'

export async function postTokensReissue(req: Request, res: Response) {
    const userRole = _.get(req.body, 'userRole')
    const token = await authServices.issueBearerToken(req.state.access._id, userRole, req.state)
    return { token }
}
