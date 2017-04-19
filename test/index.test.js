import { assert } from 'chai';
import postmark from '../src';

describe('feathers-postmark', () => {
  it('is CommonJS compatible', () => {
    assert(typeof require('../lib') === 'function');
  });

  it('basic functionality', () => {
    assert(typeof postmark === 'function', 'It worked');
    assert(typeof postmark({key: 'POSTMARK_API_KEY'}).create === 'function');
  });
});
