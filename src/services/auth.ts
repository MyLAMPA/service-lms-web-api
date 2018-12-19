
import { v4 as uuidv4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt-nodejs'
import * as _ from 'lodash'

import { config } from '../config'
import { httpErrors as errors } from '../errors'
import {
    Partial,
    State,
    TokenBody,
    Access,
    UserRole,
    User,
    Credentials,
} from '../models'
import * as accessesServices from './accesses'
import * as usersServices from './users'

export async function hashPassword(plainPassword: string, state: State): Promise<string> {
    throw errors.serverError('deprached api')
}

export async function issueBearerToken(accessId: string, activeRole: UserRole, state: State): Promise<string> {
    throw errors.serverError('deprached api')
}

export async function loginUsingCredentials(credentials: Credentials, state: State): Promise<{ bearerToken: string; activeRole: UserRole; }> {
    throw errors.serverError('deprached api')
}
