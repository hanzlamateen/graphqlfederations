const python = require('python-shell');

module.exports = {
    schema: `
        type Python {
            info: String
        }
        type Query {
            python: Python
        }
    `,
    resolvers: {
        python: () => {
            return {info: python.PythonShell.getVersionSync().trim()};
        }
    }
}