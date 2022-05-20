const { headMain } = require('../src/headLib.js');
const assert = require('assert');

const shouldReturn = (mockFile, content) => {
  return function (fileName, encoding) {
    assert.equal(mockFile, fileName);
    assert.equal(encoding, 'utf8');
    return content;
  };
};

describe('HeadMain', () => {
  it('should give the lines up to 10 by default from file', () => {
    const mockReadFileSync = shouldReturn('content.txt', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, 'content.txt'), 'hello');
  });

  it('should give the given no of characters from file', () => {
    const mockReadFileSync = shouldReturn('content.txt', 'hello');
    assert.strictEqual(headMain(mockReadFileSync, '-c', 3, 'content.txt'),
      'hel');
  });

  it('should give the number of lines from given file', () => {
    const mockReadFileSync = shouldReturn('content.txt', 'hello');
    assert.throws(() => headMain(mockReadFileSync, '-n', '4', 'missing.txt'), {
      name: 'FileReadError',
      message: 'Unable to read missing.txt',
    });
  });
});
