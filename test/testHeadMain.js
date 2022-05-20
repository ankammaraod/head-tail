/* eslint-disable max-len */
const assert = require('assert');
const { headMain } = require('../src/headMain.js');

describe('headMain', () => {
  it('should give single line', () => {
    assert.deepStrictEqual(headMain(['hello'], 1), ['hello']);
    assert.deepStrictEqual(headMain(['bye'], 1), ['bye']);
  });
  it('should give single line from multiple lines', () => {
    assert.deepStrictEqual(headMain(['hello', 'bye'], 1), ['hello']);
    assert.deepStrictEqual(headMain(['bye', 'hello'], 1), ['bye']);
  });
  it('should give 2 lines', () => {
    assert.deepStrictEqual(headMain(['hello', 'bye'], 2), ['hello', 'bye']);
    assert.deepStrictEqual(headMain(['bye', 'hello', 'good'], 2), ['bye', 'hello']);
  });
});
