
import { config } from './config'
import { server } from './server'
import { logger } from './components/logger'

const port = config.server.port

Promise
    .all([
        new Promise(resolve => {
            server.listen(port, resolve)
        }),
    ])
    .then(() => {
        logger.info({
            port,
            config: { params: config.params, server: config.server },
            processEnv: process.env,
        }, 'App has started')
    })
    .catch(err => {
        logger.error({
            port, err,
            config: { params: config.params, server: config.server },
            processEnv: process.env,
        }, 'App could not be started')
    })