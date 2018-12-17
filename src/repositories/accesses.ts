
import * as _ from 'lodash'

import {
    Partial,
    State,
    Access,
} from '../models'
import * as source from './mongo/source'

export async function getAccessById(accessId: string, includePassword: boolean = false, state: State): Promise<Access> {
    let accessExec = source.accesses.findById(accessId)

    if (!includePassword) {
        accessExec = accessExec.select('-password')
    }

    const access = await accessExec

    if (!_.isEmpty(access)) {
        return <Access>access
    }
    return null
}

export async function getAccessByUserId(userId: string, state: State): Promise<Access> {
    const access = await source.accesses.findOne({ user: userId }).select('-password')
    
    if (!_.isEmpty(access)) {
        return <Access>access
    }

    return null
}

export async function getAccessByUsername(username: string, includePassword: boolean = false, state: State): Promise<Access> {
    let accessExec = source.accesses.findOne({ username })

    if (!includePassword) {
        accessExec = accessExec.select('-password')
    }

    const access = await accessExec
    
    if (!_.isEmpty(access)) {
        return <Access>access
    }

    return null
}

export async function getActiveAccessByUsername(username: string, state: State): Promise<Access> {
    const access = await source.accesses.findOne({ username, isActive: true })

    if (!_.isEmpty(access)) {
        return <Access>access
    }

    return null
}

export async function getAccesses(params: object, state: State): Promise<Access[]> {
    const accesses = await source.accesses.find(params).select('-password')
    return accesses.filter(access => !_.isEmpty(access)).map(access => <Access>access)
}

export async function updateAccessById(accessId: string, change: Partial<Access>, state: State): Promise<void> {
    await source.accesses.findByIdAndUpdate(accessId, { $set: change })
}

export async function createAccess(access: Partial<Access>, state: State): Promise<Access> {
    const createdAccess = await source.accesses.create(access)
    return await getAccessById(createdAccess._id, false, state)
}
