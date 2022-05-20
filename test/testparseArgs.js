/* eslint-disable max-len */
const { parseArgs } = require('../src/parseArgs.js');
const assert = require('assert');

describe('parseArgs', () => {
  it('should parse the defaults if file only passed', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), { option: '-n', value: 10, files: ['a.txt'] });
  });
  it('should parse the given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', 3, 'a.txt']), { option: '-c', value: 3, files: ['a.txt'] });
  });
  it('should parse the given details if more then one file exists', () => {
    assert.deepStrictEqual(parseArgs(['-c', 3, 'a.txt', 'b.js']), { option: '-c', value: 3, files: ['a.txt', 'b.js'] });
  });
});
