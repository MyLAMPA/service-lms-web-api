
import * as joi from 'joi'

export const postContexts = joi.object().keys({
    body: joi.object().keys({
        name: joi.string().required(),
        abbr: joi.string().optional(),
    }),
})

export const patchContext = joi.object().keys({
    body: joi.object().keys({
        name: joi.string().optional(),
        abbr: joi.string().optional(),
    }),
})
