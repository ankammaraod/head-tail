/* eslint-disable max-len */
const { parseArgs } = require('../src/parseArgs.js');
const assert = require('assert');

describe('parseArgs', () => {
  it('should parse the defaults if file only passed', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']), { option: '-n', value: 10, files: ['a.txt'] });
  });

  it('should parse the given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', 'a.txt']), { option: '-c', value: 3, files: ['a.txt'] });
  });

  it('should parse the given details if more then one file exists', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', 'a.txt', 'b.js']), { option: '-c', value: 3, files: ['a.txt', 'b.js'] });
  });

  it('should parse if duplicate options are in given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', '-c', '5', 'a.txt']), { option: '-c', value: 5, files: ['a.txt'] });
  });

  it('should parse if the value is combined with details', () => {
    assert.deepStrictEqual(parseArgs(['-c3', 'a.txt']), { option: '-c', value: 3, files: ['a.txt'] });
  });

  it('should parse if the value is combined with details of two times', () => {
    assert.deepStrictEqual(parseArgs(['-c3', '-c5', 'a.txt']), { option: '-c', value: 5, files: ['a.txt'] });
  });

  it('should throw object if two different options provide', () => {
    assert.throws(() => parseArgs(['-c', '3', '-n', '5', 'a.txt']), {
      name: 'bothOptionsExists'
    });
  });
});
