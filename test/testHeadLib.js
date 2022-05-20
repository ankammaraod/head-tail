/* eslint-disable max-len */
const assert = require('assert');
const { lines, characters, headMain } = require('../src/headLib.js');

describe('lines', () => {
  it('should give single line', () => {
    assert.deepStrictEqual(lines('hello', 1), 'hello');
    assert.deepStrictEqual(lines('bye', 1), 'bye');
  });
  it('should give single line from multiple lines', () => {
    assert.deepStrictEqual(lines('hello\nbye', 1), 'hello');
    assert.deepStrictEqual(lines('bye\nhello', 1), 'bye');
  });
  it('should give 2 lines', () => {
    assert.deepStrictEqual(lines('hello\nbye', 2), 'hello\nbye');
    assert.deepStrictEqual(lines('bye\nhello\ngood', 2), 'bye\nhello');
  });
});

describe('characters', () => {
  it('should give single character from contents', () => {
    assert.deepStrictEqual(characters('hello', 1), 'h');
    assert.deepStrictEqual(characters('bye', 1), 'b');
  });
  it('should give two character from contents', () => {
    assert.deepStrictEqual(characters('hello', 2), 'he');
    assert.deepStrictEqual(characters('bye', 2), 'by');
  });
  it('should give given no of characters from contents', () => {
    assert.deepStrictEqual(characters('hello\nbye', 6), 'hello\n');
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
