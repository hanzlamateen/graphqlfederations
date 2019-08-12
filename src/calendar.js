import gapiToGraphQL from "gapi-to-graphql";
import CalendarAPI from 'gapi-to-graphql/google_apis/calendar-v3.js';

class Calendar {
    constructor() {
        var { schema, resolvers } = gapiToGraphQL({ gapiAsJsonSchema: CalendarAPI });

        schema = schema.replace("schema", "type Query");
        schema = schema.replace("query", "calendarApiQuery");

        this.schema = schema;
        
        this.queryResolvers = {
            calendarApiQuery: () => {
                return resolvers.CalendarApiQuery;
            }
        };
        this.typeResolvers = resolvers;
    }
}

module.exports = Calendar;