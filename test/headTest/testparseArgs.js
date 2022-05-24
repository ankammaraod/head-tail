const { parseArgs, isFlag, splitFlagAndValue,
  formatArgs } = require('../../src/headSrc/parseArgs.js');
const { areOptionsValid,
  throwIfFileNotExists, throwIfValueNotValid, usage } =
  require('../../src/headSrc/validateArgs.js');

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
      message:
        `head: illegal option -- p\n${usage()}`
    });
  });

  it('should throw object if two different options provide', () => {
    assert.throws(() => parseArgs(['-c', '3', '-n', '5', 'a.txt']), {
      name: 'wrongOptions',
      message: 'head: can\'t combine line and byte counts'
    });
  });
});

describe('areOptionsValid', () => {
  it('should give true if -n is given', () => {
    assert.deepStrictEqual(areOptionsValid([{ flag: '-n', value: 1 }]),
      undefined);
  });

  it('should give true if -c is given', () => {
    assert.deepStrictEqual(areOptionsValid([{ flag: '-c', value: 1 }]),
      undefined);
  });

  it('should throw error if other than -n and -c is given', () => {
    assert.throws(() => areOptionsValid([{ flag: '-p', value: 1 }]), {
      name: 'wrongOptions',
      message: 'head: illegal option -- p' +
        `\n${usage()}`
    });
  });

  it('should throw error if -n and -c is given', () => {
    assert.throws(() =>
      areOptionsValid([{ flag: '-n', value: 1 }, { flag: '-c', value: 1 }]), {
      name: 'wrongOptions',
      message: 'head: can\'t combine line and byte counts'
    });
  });
});

describe('isFlag', () => {
  it('should return true if given element is valid flag ', () => {
    assert.deepStrictEqual(isFlag('-n'), true);
  });

  it('should return false if given element is invalid flag ', () => {
    assert.deepStrictEqual(isFlag('-p'), true);
  });
});

describe('throwIfFileNotExists', () => {
  it('should not throw error if file name not exists in object', () => {
    const actual = throwIfFileNotExists(['a.txt']);
    assert.deepStrictEqual(actual, true);
  });

  it('should throw error if file name not exists in object', () => {
    assert.throws(() => throwIfFileNotExists([]), {
      name: 'fileError',
      message: usage()
    });
  });
});

describe('throwIfValueNotValid', () => {
  it('should throw if value is invalid', () => {
    assert.throws(() => throwIfValueNotValid({ flag: '-n', value: 0 }), {
      name: 'valueError',
      message: 'head: illegal line count -- 0'
    });
    assert.throws(() => throwIfValueNotValid({ flag: '-c', value: 0 }), {
      name: 'valueError',
      message: 'head: illegal byte count -- 0'
    });
  });
});
describe('splitFlagAndValue', () => {
  it('should split the flag and value', () => {
    assert.deepStrictEqual(splitFlagAndValue(['-n1']), ['-n', '1']);
  });
  it('should split the flag and value and file', () => {
    assert.deepStrictEqual(splitFlagAndValue(['-n1', 'file']),
      ['-n', '1', 'file']);
  });
  it('should throw error if args length is zero', () => {
    assert.throws(() => splitFlagAndValue([]), {
      name: 'noParameters',
      message: usage()
    });
  });
});

describe('formatArgs', () => {
  it('should format if input is -1', () => {
    assert.deepStrictEqual(formatArgs(['-1']), ['-n', '1']);
  });
  it('should give file name as it is', () => {
    assert.deepStrictEqual(formatArgs(['a.txt']), ['a.txt']);
  });
});