const assert = require('assert');
const { head, getSeparator, extract, formatHead } =
  require('../src/headLib.js');

describe('head', () => {
  it('should give single line from contents', () => {
    assert.deepStrictEqual(head({ flag: '-n', value: 1 }, 'hai'), 'hai');
  });
  it('should give single character from contents', () => {
    assert.deepStrictEqual(head({ flag: '-c', value: 1 }, 'hai'), 'h');
  });
  it('should give more than single line from contents', () => {
    assert.deepStrictEqual(head({ flag: '-n', value: 2 },
      'hai\nbye'), 'hai\nbye');
  });
  it('should give more than single character from contents', () => {
    assert.deepStrictEqual(head({ flag: '-c', value: 2 }, 'hai'), 'ha');
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

describe('formatHead', () => {
  it('should format the content if two files are given', () => {
    assert.deepStrictEqual(
      formatHead(['hai', 'bye'], ['a.txt', 'b.txt']),
      ['==>a.txt<==\nhai\n', '==>b.txt<==\nbye\n']
    );
  });
  it('should not format the content of single file', () => {
    assert.deepStrictEqual(formatHead(['hai'], ['a.txt']), ['hai']);
  });
});
