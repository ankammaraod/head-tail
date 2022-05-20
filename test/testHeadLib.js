/* eslint-disable max-len */
const assert = require('assert');
const { lines, characters } = require('../src/headLib.js');

describe('lines', () => {
  it('should give single line', () => {
    assert.deepStrictEqual(lines(['hello'], 1), ['hello']);
    assert.deepStrictEqual(lines(['bye'], 1), ['bye']);
  });
  it('should give single line from multiple lines', () => {
    assert.deepStrictEqual(lines(['hello', 'bye'], 1), ['hello']);
    assert.deepStrictEqual(lines(['bye', 'hello'], 1), ['bye']);
  });
  it('should give 2 lines', () => {
    assert.deepStrictEqual(lines(['hello', 'bye'], 2), ['hello', 'bye']);
    assert.deepStrictEqual(lines(['bye', 'hello', 'good'], 2), ['bye', 'hello']);
  });
});

describe('characters', () => {
  it('should give single character from contents', () => {
    assert.deepStrictEqual(characters(['hello']), ['h']);
    assert.deepStrictEqual(characters(['bye']), ['b']);
  });
});
