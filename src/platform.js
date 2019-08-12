const os = require('os');

module.exports = {
    schema: `
        type Query {
            platform: Platform
        }
        type Platform {
            info: String
        }
    `,
    resolvers: {
        platform: () => {
            return {info: os.platform()};
        }
    }
}