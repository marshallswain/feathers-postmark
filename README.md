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

## Documentation

Please refer to the [feathers-postmark documentation](http://docs.feathersjs.com/) for more details.

## Complete Example

Here's an example of a Feathers server that uses `feathers-postmark`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const plugin = require('feathers-postmark');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Initialize your feathers plugin
  .use('/plugin', plugin())
  .use(errorHandler());

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
