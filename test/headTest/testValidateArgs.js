const { validateInValidValue, validateFileNotExist, validateOptions }
  = require('../../src/headSrc/validateArgs.js');
const assert = require('assert');

describe('validateInValidValue', () => {
  it('should throw error if value is invalid', () => {
    assert.throws(
      () => validateInValidValue({ flag: '-n', value: 'o' }),
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
      () => validateOptions([{ flag: '-p', value: 1 }]),
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
        [{ flag: '-n', value: 1 }, { flag: '-c', value: 1 }]
      ),
      {
        name: 'illegalCombination',
        message: 'head: can\'t combine line and byte counts'
      });
  });
});
