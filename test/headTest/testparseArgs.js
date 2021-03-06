const { parseArgs, isFlag, standardized,
  splitArgs } = require('../../src/headSrc/parseArgs.js');
const { validateOptions, error,
  validateFileNotExist, validateInValidValue, usage } =
  require('../../src/headSrc/validateArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('should parse the defaults if file only passed', () => {
    assert.deepStrictEqual(parseArgs(['a.txt']),
      {
        option: { flag: '-n', count: 10 },
        files: ['a.txt']
      });
  });

  it('should parse the given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', 'a.txt']),
      {
        option: { flag: '-c', count: 3 },
        files: ['a.txt']
      });
  });

  it('should parse the given details if more then one file exists', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', 'a.txt', 'b.js']),
      {
        option: { flag: '-c', count: 3 },
        files: ['a.txt', 'b.js']
      });
  });

  it('should parse if duplicate options are in given details', () => {
    assert.deepStrictEqual(parseArgs(['-c', '3', '-c', '5', 'a.txt']),
      {
        option: { flag: '-c', count: 5 },
        files: ['a.txt']
      });
  });

  it('should parse if the count is combined with details', () => {
    assert.deepStrictEqual(parseArgs(['-c3', 'a.txt']),
      {
        option: { flag: '-c', count: 3 },
        files: ['a.txt']
      });
  });

  it('should parse if the count is combined with details of two times', () => {
    assert.deepStrictEqual(parseArgs(['-c3', '-c5', 'a.txt']),
      {
        option: { flag: '-c', count: 5 },
        files: ['a.txt']
      });
  });

  it('should throw if the flag other than -n and -c ', () => {
    assert.throws(() => parseArgs(['-p3', 'a.txt']),
      {
        name: 'illegalOption',
        message:
          `head: illegal option -- p\n${usage()}`
      });
  });

  it('should throw object if two different options provide', () => {
    assert.throws(() => parseArgs(['-c', '3', '-n', '5', 'a.txt']),
      {
        name: 'illegalCombination',
        message: 'head: can\'t combine line and byte counts'
      });
  });
});

describe('validateOptions', () => {
  it('should throw error if other than -n and -c is given', () => {
    assert.throws(() => validateOptions([{ flag: '-p', count: 1 }]),
      {
        name: 'illegalOption',
        message: 'head: illegal option -- p' +
          `\n${usage()}`
      });
  });

  it('should throw error if -n and -c is given', () => {
    const params = [{ flag: '-n', count: 1 }, { flag: '-c', count: 1 }];
    assert.throws(() => validateOptions(params),
      {
        name: 'illegalCombination',
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
  it('should throw error if file name not exists in object', () => {
    assert.throws(() => validateFileNotExist([]),
      {
        name: 'fileError',
        message: usage()
      }
    );
  });
});

describe('validateInValidValue', () => {
  it('should throw if count is invalid', () => {
    assert.throws(() => validateInValidValue({ flag: '-n', count: 0 }),
      {
        name: 'valueError',
        message: 'head: illegal line count -- 0'
      }
    );

    assert.throws(() => validateInValidValue({ flag: '-c', count: 0 }),
      {
        name: 'valueError',
        message: 'head: illegal byte count -- 0'
      }
    );
  });
});

describe('splitFlagAndValue', () => {
  it('should split the flag and count', () => {
    assert.deepStrictEqual(standardized(['-n1']), ['-n', '1']);
  });

  it('should split the flag and count and file', () => {
    assert.deepStrictEqual(standardized(['-n1', 'file']),
      ['-n', '1', 'file']);
  });

});

describe('splitArgs', () => {
  it('should format if input is -1', () => {
    assert.deepStrictEqual(splitArgs('-1'), ['-n', '1']);
  });

  it('should give file name as it is', () => {
    assert.deepStrictEqual(splitArgs('a.txt'), 'a.txt');
  });
});

describe('error', () => {
  it('should give given elements in structured way', () => {
    assert.deepStrictEqual(error('hai', 'hello'),
      { name: 'hai', message: 'hello' });
  });
});
