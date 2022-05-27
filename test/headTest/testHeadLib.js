const assert = require('assert');
const { strategy, lines, bytes }
  = require('../../src/headSrc/headLib.js');

describe('lines', () => {
  it('should give single line', () => {
    assert.deepStrictEqual(lines('hello', 1), 'hello');
    assert.deepStrictEqual(lines('bye', 1), 'bye');
  });
  it('should give single line from multiple lines', () => {
    assert.deepStrictEqual(lines('hello\nbye', 1), 'hello');
    assert.deepStrictEqual(lines('bye\nhello', 1), 'bye');
  });
  it('should give 2 lines', () => {
    assert.deepStrictEqual(lines('hello\nbye', 2), 'hello\nbye');
    assert.deepStrictEqual(lines('bye\nhello\ngood', 2), 'bye\nhello');
  });
});

describe('bytes', () => {
  it('should give single character from contents', () => {
    assert.deepStrictEqual(bytes('hello', 1), 'h');
    assert.deepStrictEqual(bytes('bye', 1), 'b');
  });
  it('should give two character from contents', () => {
    assert.deepStrictEqual(bytes('hello', 2), 'he');
    assert.deepStrictEqual(bytes('bye', 2), 'by');
  });
  it('should give given no of bytes from contents', () => {
    assert.deepStrictEqual(bytes('hello\nbye', 6), 'hello\n');
  });
});

describe('strategy', () => {
  it('should give "lines" for  -n', () => {
    assert.deepStrictEqual(strategy('-n'), lines);
  });

  it('should give bytes for  -c', () => {
    assert.deepStrictEqual(strategy('-c'), bytes);
  });
});
