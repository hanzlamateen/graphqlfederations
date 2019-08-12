module.exports = {
    schema: `
        type Query {
            text: Text
        }
        type Text {
            info: String
        }
    `,
    resolver: {
        text: () => {
            return {info: 'foo'};
        }
    }
}