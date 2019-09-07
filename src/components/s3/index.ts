
import { join as joinPaths } from 'path'
import { S3 } from 'aws-sdk'

import { config } from '../../config'
import {
    State,
} from '../../types'

const { bucket: Bucket } = config.aws.s3

const s3 = new S3({
    region: config.aws.region,
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
})

export const uploadFile = async(
    path: string,
    filename: string,
    file: NodeJS.ReadableStream,
    state: State,
    contentType: string = undefined,
    encoding: string = undefined,
): Promise<{
    fileKey: string
}> => {
    try {
        const Key = joinPaths(path, filename)

        const { Key: fileKey } = await s3.upload({
            Bucket, Key,
            Body: file,
            ContentType: contentType,
            ContentEncoding: encoding,
        }).promise()

        return { fileKey }
    } catch (err) {
        state.logger.error({ err }, 'Error while uploading file to S3')
        throw Error('Upload Failed') // awsS3Errors.uploadFailed()
    }
}

export const getFile = (fileKey: string, state: State): Promise<S3.GetObjectOutput> => {
    return new Promise((resolve, reject) => {
        s3.getObject({
            Bucket,
            Key: fileKey,
        }, (error: any, data: S3.GetObjectOutput) => {
            if (error) {
                return reject(error)
            }

            return resolve(data)
        })
    })
}
