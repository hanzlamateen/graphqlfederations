module.exports = {
    schema: `
        type Query {
            text: Text
        }
        type Text {
            info: String
        }
    `,
    resolvers: {
        text: () => {
            return {info: 'foo'};
        }
    }
}