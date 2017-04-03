const Debug = require('debug');
const Proto = require('uberproto');
const postmark = require('postmark');

const debug = Debug('feathers-mailer');
const defaults = {
  key: undefined // Must be provided.
};

class Service {
  constructor (options) {
    debug('constructor');

    if (!options.key) {
      throw new Error('feathers-postmark: a Postmark API `key` must be provided on the options');
    }

    this.model = new postmark.Client(options.key);
  }

  extend (obj) {
    return Proto.extend(obj, this);
  }

  create (data, params, cb) {
    debug('create', data, params);

    // Message format
    // {
    //   From: 'donotreply@example.com',
    //   To: 'target@example.us',
    //   Subject: 'Test',
    //   TextBody: 'Test Message'
    // }

    return new Promise((resolve, reject) => {
      this.model.sendEmail(data, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

function init (options) {
  options = Object.assign({}, defaults, options);
  return new Service(options);
}

init.Service = Service;

module.exports = init;
