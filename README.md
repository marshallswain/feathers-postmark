# feathers-postmark

[![Build Status](https://travis-ci.org/feathersjs/feathers-postmark.png?branch=master)](https://travis-ci.org/feathersjs/feathers-postmark)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-postmark/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-postmark)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-postmark/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-postmark/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-postmark.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-postmark)
[![Download Status](https://img.shields.io/npm/dm/feathers-postmark.svg?style=flat-square)](https://www.npmjs.com/package/feathers-postmark)

> A Postmark API service adapter for FeathersJS

## Installation

```
npm install feathers-postmark --save
```

[![postmark-logo](https://cloud.githubusercontent.com/assets/128857/24642528/13ccfa0e-18c5-11e7-88fe-362d58ff8c24.jpg)
](https://postmarkapp.com/)

## Documentation

The `feathers-postmark` service adapter creates services that send transactional email through [Postmark](https://postmarkapp.com/).

### Configuration
Like all Feathers service adapters, the `postmark` adapter is a function that receives an object as options and returns a class implementing the Feathers `service interface`.

### `postmark(options)`
- `options` `{Object}`
  - `key` `{String}` - Your Postmark API key.

Once you have passed your Postmark API `key` in the `options`, the service is ready to be `use`d in your application:

```js
const postmark = require('feathers-postmark');
const options = {
  key: 'Your Postmark API Key'
};

app.use('messages', postmark(options));

app.service('messages').hooks({
  before: {
    create: [
      // Hint: use hooks to protect your service from outside access.
    ]
  }
});
```
### `service.create(data[, params]) -> promise`
The `create` method will send the provided `data` through the [Postmark Email API](http://developer.postmarkapp.com/developer-api-email.html#send-email).
- `data` `{Object}` - Supports any of the options available in the Postmark [Email API body format](http://developer.postmarkapp.com/developer-api-email.html#send-email).

```js
const message = {
  "From": "sender@example.com",
  "To": "receiver@example.com",
  "Cc": "copied@example.com",
  "Bcc": "blank-copied@example.com",
  "Subject": "Test",
  "Tag": "Invitation",
  "HtmlBody": "<b>Hello</b>",
  "TextBody": "Hello",
  "ReplyTo": "reply@example.com",
  "Headers": [
    {
      "Name": "CUSTOM-HEADER",
      "Value": "value"
    }
  ],
  "TrackOpens": true,
  "TrackLinks": "None",
  "Attachments": [
    {
      "Name": "readme.txt",
      "Content": "dGVzdCBjb250ZW50",
      "ContentType": "text/plain"
    },
    {
      "Name": "report.pdf",
      "Content": "dGVzdCBjb250ZW50",
      "ContentType": "application/octet-stream"
    }
  ]
};

app.service('my-postmark-service').create(message);
```

## Complete Example

Here's an example of a Feathers server that uses `feathers-postmark`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const postmark = require('feathers-postmark');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Initialize your feathers plugin
  .use('messages', postmark({key: 'your postmark api key'})
  .use(errorHandler());

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
