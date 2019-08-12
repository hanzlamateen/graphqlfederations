const { printSchema } = require("graphql");
const convertSchema = require("./airtable/convertSchema");
const createResolvers = require("./airtable/createResolvers");
const airtable = require("airtable");
const fs = require('fs')

class Airtable {
  constructor(apiKey, config = {}) {
    this.columns = {};
    airtable.configure({ apiKey });
    const schema = JSON.parse(fs.readFileSync(config.schemaPath || "./schema.json", "utf8"));

    var normalizedPath = require("path").join(__dirname, "airtable", "columns");
    require("fs")
      .readdirSync(normalizedPath)
      .forEach(file => {
        require("./airtable/columns/" + file)(this);
      });

    this.api = airtable.base(schema.id);
    this.schema = convertSchema(schema, this.columns);

    this.resolvers = createResolvers(
      schema,
      this.api,
      this.columns
    );
    this.schema = printSchema(this.schema);
  }

  addColumnSupport(columnType, config) {
    this.columns = {
      ...this.columns,
      [columnType]: config
    };
  }
}

module.exports = Airtable;