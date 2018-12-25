
import { HttpSource } from 'http-source'

import { config } from '../../../../config'

const source = new HttpSource(config.identityService.baseUrl)

source.setGlobalHeader('X-Access-Key-Id', config.identityService.accessKeyId)
source.setGlobalHeader('X-Secret-Access-Key', config.identityService.secretAccessKey)

export { source }
