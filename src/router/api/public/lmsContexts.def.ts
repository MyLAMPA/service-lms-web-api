
import * as joi from 'joi'

export const postLMSContexts = joi.object().keys({
    body: joi.object().keys({
        name: joi.string().required(),
        abbr: joi.string().optional(),
    }),
})

export const patchLMSContext = joi.object().keys({
    body: joi.object().keys({
        name: joi.string().optional(),
        abbr: joi.string().optional(),
    }),
})
