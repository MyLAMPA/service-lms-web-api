
import { Request } from 'express'
import * as busboy from 'busboy'

import { authErrors } from '../../errors'
import * as imagesServices from '../../services/images'

export const postImages = async(request: Request) => {
    if (!!request.state.idCtx.virtual) {
        throw authErrors.virtualUnauthorized()
    }

    return new Promise((resolve, reject) => {
        const uploader = new busboy({ headers: request.headers })
    
        uploader.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            try {
                const createdImage = await imagesServices
                    .uploadAndCreateImage(filename, file, request.state, mimetype, encoding)
                return resolve(createdImage)
            } catch (err) {
                request.state.logger.error({ err }, 'Image upload failed')
                reject(err)
            }
        })
    
        uploader.on('finish', () => {})
    
        request.pipe(uploader)
    })
}
