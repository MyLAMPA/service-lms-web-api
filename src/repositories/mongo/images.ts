
import * as _ from 'lodash'
import { Error } from 'mongoose'

const { CastError } = Error

import { config } from '../../config'
import { httpErrors } from '../../errors'
import {
    Partial,
    State,
    Image,
} from '../../types'
import { source } from './source'
import { makeElasticQueryOnCollection } from '../../components/elasticsearch'
import { LmsTableName } from './schemas'
import { imageSchema } from './schemas/image'

const imagesCollection = source.collection<Image>(
    LmsTableName.image,
    imageSchema,
    `${config.mongoose.tablePrefix ? config.mongoose.tablePrefix + '-' : ''}lms-images`
)

export const getImages = async(params: object, state: State) => {
    const images = await imagesCollection.find(params)
    return images
        .filter(image => !_.isEmpty(image))
        .map(image => <Image>image)
}

export const getImageById = async(imageId: string, state: State): Promise<Image> => {
    let image
    try {
        image = await imagesCollection.findById(imageId)
    } catch (err) {
        if (err instanceof CastError) {
            return null
        }
        throw err
    }

    if (!_.isEmpty(image)) {
        return image
    }
    return null
}

export const createImage = async(document: Image, state: State): Promise<Image> => {
    const createdImage = await imagesCollection.create(document)
    return createdImage
}

export const elasticQueryImages = async(query: object, state: State, size: number = undefined, from: number = undefined) =>
    makeElasticQueryOnCollection<Image>(imagesCollection, query, state, size, from)
