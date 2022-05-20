/* eslint-disable max-len */
const assert = require('assert');
const { lines, characters, headMain } = require('../src/headLib.js');

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
    assert.deepStrictEqual(characters(['hello'], 1), ['h']);
    assert.deepStrictEqual(characters(['bye'], 1), ['b']);
  });
  it('should give two character from contents', () => {
    assert.deepStrictEqual(characters(['hello'], 2), ['he']);
    assert.deepStrictEqual(characters(['bye'], 2), ['by']);
  });
  it('should give given no of characters from contents', () => {
    assert.deepStrictEqual(characters(['hello', 'bye'], 6), ['hello', '']);
  });
});

describe('headMain', () => {
  it('should give single line from contents', () => {
    assert.deepStrictEqual(headMain('fun', ['-n', 1, 'file']), 'hai');
  });
  it('should give single character from contents', () => {
    assert.deepStrictEqual(headMain('fun', ['-c', 1, 'file']), 'h');
  });
});
