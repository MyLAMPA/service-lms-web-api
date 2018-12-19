
import * as _ from 'lodash'
import * as moment from 'moment'

import { httpErrors as errors } from '../../errors'
import {
    State,
    Access,
} from '../../models'
import { accessesRepository } from '../../repositories'

export async function getAccessByIdWithPassword(accessId: string, state: State): Promise<Access> {
    const access = accessesRepository.getAccessById(accessId, true, state)
    if (access) {
        return access
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccessById(accessId: string, state: State): Promise<Access> {
    const access = accessesRepository.getAccessById(accessId, false, state)
    if (access) {
        return access
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccessByUserId(userId: string, state: State): Promise<Access> {
    const access = await accessesRepository.getAccessByUserId(userId, state)
    if (access) {
        return access
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccessByUsernameWithPassword(username: string, state: State): Promise<Access> {
    const access = accessesRepository.getAccessByUsername(username, true, state)
    if (access) {
        return access
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccessByUsername(username: string, state: State): Promise<Access> {
    const access = accessesRepository.getAccessByUsername(username, false, state)
    if (access) {
        return access
    }
    throw errors.notFound('Access Not Found')
}

export async function getActiveAccessByUsername(username: string, state: State): Promise<Access> {
    const access = await accessesRepository.getActiveAccessByUsername(username, state)
    if (access) {
        return access
    }
    throw errors.notFound('Access Not Found')
}

export async function isUsernameInUse(username: string, state: State): Promise<boolean> {
    const access = await accessesRepository.getAccessByUsername(username, false, state)
    return !!access
}
