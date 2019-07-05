
import { HttpSource } from 'http-source'

import { config } from '../../../../config'

const source = new HttpSource(config.stripeConnectService.baseUrl)

source.setGlobalHeader('X-Access-Key-Id', config.stripeConnectService.accessKeyId)
source.setGlobalHeader('X-Secret-Access-Key', config.stripeConnectService.secretAccessKey)

export { source }
