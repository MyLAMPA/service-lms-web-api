
import { Model } from 'mongoose'

import { mongoose } from '../connector'
import { currencySchema } from '../schemas/currency'
import {
    CurrencyDocumet,
} from '../../../models'

const currencyModel: Model<CurrencyDocumet> = mongoose.model<CurrencyDocumet>('Currency', currencySchema)

export { currencyModel }
