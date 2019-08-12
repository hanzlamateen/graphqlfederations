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
    resolver: {
        platform: () => {
            return {info: os.platform()};
        }
    }
}