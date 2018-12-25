
export default {
    server: {
        host: '0.0.0.0',
        port: 8080,
    },
    mongoose: {
        url: 'mongodb://127.0.0.1:27017/lampa',
    },
    subscriptionManagementService: {
        baseUrl: 'http://localhost:3002',
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
    },
    identityService: {
        baseUrl: 'http://localhost:3001',
        accessKeyId: 'notSet',
        secretAccessKey: 'notSet',
    },
}
