
import { Request, Response } from 'express'
import * as _ from 'lodash'

import * as authServices from '../../services/auth'

export async function postLogin(req: Request, res: Response) {
    const loginResponse = await authServices.loginUsingCredentials(req.body, req.state)
    return loginResponse
}
