
import * as _ from 'lodash'
import slugify from 'slugify'

import {
    State,
    BucketFolder,
} from '../types'
import { normalizeString } from '../helpers/normalizeString'
import * as s3 from '../components/s3'

export const uploadImage = async(
    name: string,
    image: NodeJS.ReadableStream,
    state: State,
    contentType: string = undefined,
    encoding: string = undefined,
): Promise<{
    key: string
    fileKey: string
}> => {
    const fileKey = `${Math.round(Math.random() * 1000000)}-${slugify(normalizeString(name, ' ', ['.']), {
        replacement: '-',
        remove: null,
        lower: true,
    })}`
    const { fileKey: key } = await s3
        .uploadFile(BucketFolder.images, fileKey, image, state, contentType, encoding)
    return { key, fileKey }
}
