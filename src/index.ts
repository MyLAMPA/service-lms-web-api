
import { config } from './config'
import { server } from './server'
import { logger } from './components/logger'

const port = config.server.port

class Application {
    private static startServer() {
        return new Promise(r => server.listen(port, r))
    }

    public static async start() {
        // await (new Promise(r => setTimeout(r, 2000)))
        await Application.startServer()
    }
}

Application
    .start()
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
