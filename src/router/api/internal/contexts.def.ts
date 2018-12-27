
import * as joi from 'joi'

export const patchContext = joi.object().keys({
    body: joi.object().keys({
        status: joi.string().valid(['freetrial', 'active', 'suspended', 'archived']).optional(),
    }),
})
