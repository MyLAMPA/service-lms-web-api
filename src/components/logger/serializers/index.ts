
import * as _ from 'lodash';

const headerWhitelist = [
    'cache-control',
    'content-type',
    'accept',
    'host',
    'accept-encoding',
    'content-length',
    'connection',
    'user-agent',
]

export const serializers = {
    req(req): any {
        const headers = _.pick(_.get(req, 'headers'), headerWhitelist)
        return _.merge(
            { },
            _.pick(req, ['body', 'query']),
            { headers, url: _.get(req, 'url') }
        );
    },
    res(res): any {
        const allHeaders = _.get(res, 'headers')
        const headers = _.pick(allHeaders, headerWhitelist)
        return _.merge({}, { headers }, _.pick(res, 'statusCode'))
    },
    config(config): any {
        return _.pick(config, [
            'params.verbrose',
            'server.host',
            'server.port',
        ])
    },
    processEnv(params): any {
        return _.pick(params, [
            'NODE_ENV',
            'CONFIG_ENV',
            'PORT',
            'deploymentVersion',
            'logLevel',
            'CUSTOM_MAX_OLD_SPACE_SIZE',
        ])
    },
    trackers(params): any {
        return _.pick(params, ['correlationId'])
    },
}