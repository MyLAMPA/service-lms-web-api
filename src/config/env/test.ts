
export default {
    server: {
        host: '0.0.0.0',
        port: 3000,
    },
    aws: {
        region: 'eu-central-1',
        dynamoose: {
            tableNamePrefix: 'test-',
        },
    },
    mongoose: {
        url: 'mongodb://127.0.0.1:27017/lampa',
        tablePrefix: 'test-',
    },
}
