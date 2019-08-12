const { ApolloServer} = require('apollo-server');
const { mergeTypes } = require('merge-graphql-schemas');
const python = require('./python');
const platform = require('./platform');
const text = require('./text');
const Airtable = require('./airtable');

let airtable = new Airtable("airtable_api_key");

const types = [
    python.schema,
    platform.schema,
    text.schema,
    airtable.schema
];

const typeDefs = mergeTypes(types, { all: true });

var resolvers = {
    Query: {
        ...python.resolver,
        ...platform.resolver,
        ...text.resolver
    }
}

for (let item in airtable.resolvers) {
    var first = item.charAt(0);
    
    // first character is a lowercase letter
    if (first === first.toLowerCase() && first !== first.toUpperCase()) {
        resolvers.Query[item] = airtable.resolvers[item];
    }
    else {
        resolvers[item] = airtable.resolvers[item];
    }
}
        

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
});