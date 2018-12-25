
import { HttpSource } from 'http-source'

import { config } from '../../../../config'

const source = new HttpSource(config.subscriptionManagementService.baseUrl)

source.setGlobalHeader('X-Access-Key-Id', config.subscriptionManagementService.accessKeyId)
source.setGlobalHeader('X-Secret-Access-Key', config.subscriptionManagementService.secretAccessKey)

export { source }
