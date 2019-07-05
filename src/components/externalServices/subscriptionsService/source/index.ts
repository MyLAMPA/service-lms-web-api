
import { HttpSource } from 'http-source'

import { config } from '../../../../config'

const source = new HttpSource(config.subscriptionsService.baseUrl)

source.setGlobalHeader('X-Access-Key-Id', config.subscriptionsService.accessKeyId)
source.setGlobalHeader('X-Secret-Access-Key', config.subscriptionsService.secretAccessKey)

export { source }
