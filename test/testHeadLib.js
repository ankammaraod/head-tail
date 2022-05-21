const assert = require('assert');
const { head, getSeparator, extract } = require('../src/headLib.js');

describe('head', () => {
  it('should give single line from contents', () => {
    assert.deepStrictEqual(head('-n', 1, 'hai'), 'hai');
  });
  it('should give single character from contents', () => {
    assert.deepStrictEqual(head('-c', 1, 'hai'), 'h');
  });
  it('should give more than single line from contents', () => {
    assert.deepStrictEqual(head('-n', 2, 'hai\nbye'), 'hai\nbye');
  });
  it('should give more than single character from contents', () => {
    assert.deepStrictEqual(head('-c', 2, 'hai'), 'ha');
  });
});

describe('getSeparator', () => {
  it('should give "" for -c option', () => {
    assert.deepStrictEqual(getSeparator('-c'), '');
  });
  it('should give "slash n" for -n option', () => {
    assert.deepStrictEqual(getSeparator('-n'), '\n');
  });
});

describe('extract', () => {
  it('should give single character', () => {
    assert.deepStrictEqual(extract('hello', '', 1), 'h');
  });

  it('should give more than single character', () => {
    assert.deepStrictEqual(extract('hello', '', 2), 'he');
  });

  it('should give single line', () => {
    assert.deepStrictEqual(extract('hello\nbye', '\n', 1), 'hello');
  });

  it('should give more than single line', () => {
    assert.deepStrictEqual(extract('hello\nbye', '\n', 2), 'hello\nbye');
  });
});
