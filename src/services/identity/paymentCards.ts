
import * as _ from 'lodash'

import { errorCodes } from '../../errors/errorCodes'
import {
    State,
} from '../../types'
import * as stripeConnect from '../../components/externalServices/stripeConnect'

export const updateUserPaymentCard = async(userId: number, stripeTokenId: string, state: State) => {
    await stripeConnect.updateUserSource(userId, stripeTokenId, state)
}

export const getPaymentCardIfExists = async(userId: number, state: State) => {
    try {
        const card = await getPaymentCard(userId, state)
        return card
    } catch (err) {
        if (_.get(err, 'code') === errorCodes.paymentsErrors.defaultSourceMissing) {
            return null
        }
        throw err
    }
}

export const getPaymentCard = async(userId: number, state: State) => {
    const card = await stripeConnect.getUserSource(userId, state)
    return card
}
