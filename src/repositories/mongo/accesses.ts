
import * as _ from 'lodash'

import { config } from '../../config'
import {
    Partial,
    State,
    Access,
} from '../../models'
import { source } from './source'
import { accessSchema, AccessName } from './schemas/access'

const accessesCollection = source.collection<Access>(
    AccessName,
    accessSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}accesses`
)

export async function getAccessById(accessId: string, includePassword: boolean = false, state: State): Promise<Access> {
    let accessExec = accessesCollection.findById(accessId)

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
    const access = await accessesCollection.findOne({ user: userId }).select('-password')
    
    if (!_.isEmpty(access)) {
        return <Access>access
    }

    return null
}

export async function getAccessByUsername(username: string, includePassword: boolean = false, state: State): Promise<Access> {
    let accessExec = accessesCollection.findOne({ username })

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
    const access = await accessesCollection.findOne({ username, isActive: true })

    if (!_.isEmpty(access)) {
        return <Access>access
    }

    return null
}

export async function getAccesses(params: object, state: State): Promise<Access[]> {
    const accesses = await accessesCollection.find(params).select('-password')
    return accesses.filter(access => !_.isEmpty(access)).map(access => <Access>access)
}

export async function updateAccessById(accessId: string, change: Partial<Access>, state: State): Promise<void> {
    await accessesCollection.findByIdAndUpdate(accessId, { $set: change })
}

export async function createAccess(access: Partial<Access>, state: State): Promise<Access> {
    const createdAccess = await accessesCollection.create(access)
    return await getAccessById(createdAccess._id, false, state)
}
