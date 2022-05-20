/* eslint-disable max-len */
const assert = require('assert');
const { head } = require('../src/headLib.js');

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
