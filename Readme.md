# GraphQL Federations

This is a federation of graphql for Airtable, Google Calendar

## Using this script

Download the packages using by using following command:
```javascript
$ npm install
```
Pull your airtable schema by running the following command in the root folder of your project.

```javascript
$ node airtable/bin/cli.js pull --email=[your_email] --password=[your_password] --base=[base_id]
```

Update you api key in index.js file:
```javascript
let airtable = new Airtable("airtable_api_key");
```

Then, start the server by using following command:
```javascript
$ npm run start
```

Run following sample query in playground:

```javascript
{
    platform
    {
        info
    }
    text
    {
        info
    }
    python
    {
        info
    }
    stories
    {
        id
        storyName
    }
}
```

## References:
* https://github.com/Urigo/merge-graphql-schemas#merging-type-definitions
* https://github.com/thomascullen/airtable-graphql
* https://github.com/rlancer/gapi-to-graphql
* https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/