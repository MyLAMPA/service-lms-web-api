
import * as joi from 'joi'

export const getLessonOutcomes = joi.object().keys({
    query: joi.object().keys({
        source: joi.string().valid('suggestion', 'lesson').optional(),
    }),
})
