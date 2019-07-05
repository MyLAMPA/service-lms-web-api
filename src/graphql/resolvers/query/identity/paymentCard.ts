
import { Request } from 'express'
import {
    GraphQLList,
    GraphQLString,
} from 'graphql'
import * as _ from 'lodash'

import {
    IDCtx,
} from '../../../../types'
import {
    Model as PaymentCardModel,
} from '../../../types/paymentCard'
import * as paymentCardsServices from '../../../../services/identity/paymentCards'

export const paymentCard = {
    type: PaymentCardModel,
    args: {},
    async resolve({ userId }: IDCtx, {}, { state }: Request) {
        const card = await paymentCardsServices.getPaymentCardIfExists(userId, state)
        return card
    },
}
