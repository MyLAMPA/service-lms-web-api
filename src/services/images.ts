
import * as _ from 'lodash'

import { coreErrors } from '../errors'
import {
    State,
    Image,
} from '../types'
import { imagesRepository } from '../repositories'
import * as s3FilesServices from './s3Files'

export const getImageById = async(imageId: string, state: State): Promise<Image> => {
    const image = await imagesRepository.getImageById(imageId, state)
    if (image) {
        return image
    }
    throw coreErrors.imageNotFound()
}

export const createImage = async(image: Partial<Image>, state: State): Promise<Image> => {
    const document = _.merge(
        {},
        {
            createdAt: new Date(),
            createdBy: null,
            file: {
                key: null,
                fileKey: null,
            },
            title: null,
            description: null,
            tags: [],
        },
        _.pick(image, ['createdBy', 'file.key', 'file.fileKey', 'title', 'description', 'tags']),
    )
    const createdImage = await imagesRepository.createImage(document as Image, state)
    return createdImage
}

export const uploadAndCreateImage = async(
    imageName: string,
    imageFile: NodeJS.ReadableStream,
    state: State,
    contentType: string = undefined,
    encoding: string = undefined,
): Promise<Image> => {
    const file = await s3FilesServices.uploadImage(imageName, imageFile, state, contentType, encoding)
    const image = await createImage({ createdBy: state.idCtx.userId, file }, state)
    return image
}
