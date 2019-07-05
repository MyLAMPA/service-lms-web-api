
import * as _ from 'lodash'

import { httpErrors } from '../errors'
import {
    State,
    EmailAddress,
} from '../types'
import { normalizeEmailAddress } from '../helpers/email'
import { emailAddressesRepository } from '../repositories'

export const getEmailAddressById = async(emailAddressId: string, state: State): Promise<EmailAddress> => {
    const emailAddress = await emailAddressesRepository.getEmailAddressById(emailAddressId, state)
    if (emailAddress) {
        return emailAddress
    }
    throw httpErrors.notFound('EmailAddress Not Found')
}

export const getOrCreateByEmail = async(email: string, state: State): Promise<EmailAddress> => {
    const normalizedEmail = normalizeEmailAddress(email)
    const existingEmailAddress = await emailAddressesRepository.getByEmail(normalizedEmail, state)
    if (existingEmailAddress) {
        return existingEmailAddress
    }
    const createdEmailAddress = await emailAddressesRepository.createEmailAddress({ email: normalizedEmail, userId: null, isVerified: false }, state)
    return createdEmailAddress
}

export const isEmailInUse = async(email: string, state: State): Promise<boolean> => {
    const emailAddress = await emailAddressesRepository.getByEmail(email, state)
    return emailAddress && !!emailAddress.isVerified
}
