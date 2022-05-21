const { parseArgs, areOptionsValid, isFlag } = require('../src/parseArgs.js');
const assert = require('assert');

describe('parseArgs', () => {
  it('should parse the defaults if file only passed', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      { option: { flag: '-n', value: 10 }, files: ['a.txt'] });
  });

  it('should parse the given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', 'a.txt']),
      { option: { flag: '-c', value: 3 }, files: ['a.txt'] });
  });

  it('should parse the given details if more then one file exists', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', 'a.txt', 'b.js']),
      { option: { flag: '-c', value: 3 }, files: ['a.txt', 'b.js'] });
  });

  it('should parse if duplicate options are in given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', '-c', '5', 'a.txt']),
      { option: { flag: '-c', value: 5 }, files: ['a.txt'] });
  });

  it('should parse if the value is combined with details', () => {
    assert.deepStrictEqual(parseArgs(['-c3', 'a.txt']),
      { option: { flag: '-c', value: 3 }, files: ['a.txt'] });
  });

  it('should parse if the value is combined with details of two times', () => {
    assert.deepStrictEqual(parseArgs(['-c3', '-c5', 'a.txt']),
      { option: { flag: '-c', value: 5 }, files: ['a.txt'] });
  });

  it('should throw if the flag other than -n and -c ', () => {
    assert.throws(() => parseArgs(['-p3', 'a.txt']), {
      name: 'wrongOptions',
      message: 'problem with options'
    });
  });

  it('should throw object if two different options provide', () => {
    assert.throws(() => parseArgs(['-c', '3', '-n', '5', 'a.txt']), {
      name: 'wrongOptions',
      message: 'problem with options'
    });
  });
});

describe('areOptionsValid', () => {
  it('should give true if -n is given', () => {
    assert.deepStrictEqual(areOptionsValid(['-n']), true);
  });

  it('should give true if -c is given', () => {
    assert.deepStrictEqual(areOptionsValid(['-c']), true);
  });

  it('should give false if other than -n and -c is given', () => {
    assert.deepStrictEqual(areOptionsValid(['-p']), false);
  });
});

describe.only('isFlag', () => {
  it('should return true if given element is valid flag ', () => {
    assert.deepStrictEqual(isFlag('-n'), true);
  });

  it('should return false if given element is invalid flag ', () => {
    assert.deepStrictEqual(isFlag('-p'), false);
  });
});
