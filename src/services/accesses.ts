
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../errors'
import {
    State,
    Access,
} from '../models'
import { accessesRepository } from '../repositories'

export async function getAccessByIdWithPassword(accessId: string, state: State): Promise<Access> {
    throw errors.serverError('deprached api')
}

export async function getAccessById(accessId: string, state: State): Promise<Access> {
    throw errors.serverError('deprached api')
}

export async function getAccessByUserId(userId: string, state: State): Promise<Access> {
    throw errors.serverError('deprached api')
}

export async function getAccessByUsernameWithPassword(username: string, state: State): Promise<Access> {
    throw errors.serverError('deprached api')
}

export async function getAccessByUsername(username: string, state: State): Promise<Access> {
    throw errors.serverError('deprached api')
}

export async function getActiveAccessByUsername(username: string, state: State): Promise<Access> {
    throw errors.serverError('deprached api')
}

export async function isUsernameInUse(username: string, state: State): Promise<boolean> {
    throw errors.serverError('deprached api')
}
