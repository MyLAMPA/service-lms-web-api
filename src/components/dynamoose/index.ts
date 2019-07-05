
import * as dynamoose from 'dynamoose'

import { config } from '../../config'

export { Schema } from 'dynamoose'

dynamoose.AWS.config.update({
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
    region: config.aws.region,
})

// if (typeof config.aws.dynamodb.endpoint === 'string') {
//     dynamoose.local(config.aws.dynamodb.endpoint)
// }

export default dynamoose
