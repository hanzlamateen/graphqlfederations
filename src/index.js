const { ApolloServer} = require('apollo-server');
const { mergeTypes } = require('merge-graphql-schemas');
const python = require('./python');
const platform = require('./platform');
const text = require('./text');
const Airtable = require('./airtable');
const Calendar = require('./calendar');

// Airtable
let airtable = new Airtable("airtable_api_key");

// Google Calendar
let calendar = new Calendar();

const types = [
    python.schema,
    platform.schema,
    text.schema,
    airtable.schema,
    calendar.schema
];

const typeDefs = mergeTypes(types, { all: true });

var resolvers = {
    Query: {
        ...python.resolvers,
        ...platform.resolvers,
        ...text.resolvers,
        ...airtable.queryResolvers,
        ...calendar.queryResolvers
    },
    ...airtable.typeResolvers,
    ...calendar.typeResolvers
}    

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});