
import * as crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'

import { config } from '../../config'
import dynamoose from '../../components/dynamoose'
import {
    State,
    EmailAddress,
} from '../../types'
import { emailAddressSchema } from './source/schemas/emailAddress'

const emailAddressesCollection = dynamoose.model<EmailAddress, any>(
    `${config.configEnv}-emailaddresses`,
    emailAddressSchema,
    { update: true },
)

export const getEmailAddressById = async(emailAddressId: string, state: State): Promise<EmailAddress> => {
    const emailAddress = await emailAddressesCollection.queryOne({ id: emailAddressId }).exec()
    if (!_.isEmpty(emailAddress)) {
        return emailAddress
    }
    return null
}

export const getByEmail = async(email: string, state: State): Promise<EmailAddress> => {
    const emailAddress = await emailAddressesCollection.queryOne({ email }).exec()
    if (!_.isEmpty(emailAddress)) {
        return emailAddress
    }
    return null
}

export const createEmailAddress = async(emailAddress: Partial<EmailAddress>, state: State): Promise<EmailAddress> => {
    const id: string = uuidv4()

    const document = _.merge(
        {},
        emailAddress,
        { id },
    ) as EmailAddress

    await emailAddressesCollection.create(document)

    return await getEmailAddressById(id, state)
}
