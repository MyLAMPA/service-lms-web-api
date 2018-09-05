
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
} from '../models'
import * as db from '../repositories/mongo'
import * as usersServices from './users'

export async function getAccessById(accessId: string, includePassword: boolean = false, state: State): Promise<Access> {
    let accessExec = db.accesses.findById(accessId)
    if (!includePassword) {
        accessExec = accessExec.select('-password')
    }

    const access = await accessExec

    if (!_.isNil(access)) {
        return access.toObject()
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccessByUserId(userId: string, state: State): Promise<Access> {
    const access = await db.accesses.findOne({ user: userId }).select('-password')
    if (!_.isNil(access)) {
        return access.toObject()
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccessByUsername(username: string, includePassword: boolean = false, state: State): Promise<Access> {
    let accessExec = db.accesses.findOne({ username })
    if (!includePassword) {
        accessExec = accessExec.select('-password')
    }

    const access = await accessExec
    
    if (!_.isNil(access)) {
        return access.toObject()
    }
    throw errors.notFound('Access Not Found')
}

export async function getActiveAccessByUsername(username: string, state: State): Promise<Access> {
    const access = await db.accesses.findOne({ username, isActive: true })
    if (!_.isNil(access)) {
        return access.toObject()
    }
    throw errors.notFound('Access Not Found')
}

export async function getAccesses(params: object, state: State): Promise<Access[]> {
    const accesses = await db.accesses.find(params).select('-password')
    return accesses.map(access => access.toObject())
}

export async function isUsernameInUse(username: string, state: State): Promise<boolean> {
    const access = await db.accesses.findOne({ username })
    return !_.isNil(access)
}

export async function updateAccessById(accessId: string, access: Partial<Access>, state: State): Promise<Access> {
    await db.accesses.findByIdAndUpdate(accessId, { $set: access })
    return await getAccessById(accessId, false, state)
}

export async function createAccess(access: Partial<Access>, state: State): Promise<Access> {
    const _access = await db.accesses.create(access)
    return await getAccessById(_access._id, false, state)
}
