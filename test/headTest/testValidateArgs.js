const { validateInValidValue, validateFileNotExist, validateOptions }
  = require('../../src/headSrc/validateArgs.js');
const assert = require('assert');

describe('validateInValidValue', () => {
  it('should throw error if count is invalid', () => {
    assert.throws(
      () => validateInValidValue({ flag: '-n', count: 'o' }),
      {
        name: 'valueError',
        message: 'head: illegal line count -- o'
      }
    );
  });
});

describe('validateFileNotExist', () => {
  it('should throw error if file not exist in the args', () => {
    assert.throws(
      () => validateFileNotExist([]),
      {
        name: 'fileError',
        message: 'usage: head [-n lines | -c bytes] [file ...]'
      }
    );
  });
});

describe('validateOptions', () => {
  it('should throw error if illegal flag exists', () => {
    assert.throws(
      () => validateOptions([{ flag: '-p', count: 1 }]),
      {
        name: 'illegalOption',
        message:
          'head: illegal option -- p\n'
          + 'usage: head [-n lines | -c bytes] [file ...]'
      }
    );
  });

  it('should throw error if illegal combination exists', () => {
    assert.throws(
      () => validateOptions(
        [{ flag: '-n', count: 1 }, { flag: '-c', count: 1 }]
      ),
      {
        name: 'illegalCombination',
        message: 'head: can\'t combine line and byte counts'
      });
  });
});
