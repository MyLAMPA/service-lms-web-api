
import * as joi from 'joi'

export const putActivitiesDef = joi.object().keys({
    body: joi.array().items(joi.string()).required(),
})

export const postActivitiesDef = joi.object().keys({
    body: joi.array().items(joi.string()).required(),
})
