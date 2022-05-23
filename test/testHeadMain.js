const { headMain } = require('../src/headLib.js');
const assert = require('assert');

const shouldReturn = (mockFile, content) => {
  let index = 0;
  return function (fileName, encoding) {
    assert.equal(mockFile[index], fileName);
    assert.equal(encoding, 'utf8');
    index++;
    return content;
  };
};

describe('HeadMain', () => {
  it('should give the lines up to 10 by default from single file', () => {
    const mockReadFileSync = shouldReturn(['content.txt'], 'hello');
    assert.strictEqual(headMain(mockReadFileSync, 'content.txt'), 'hello');
  });

  it('should give the given no of lines from two file', () => {
    const mockReadFileSync = shouldReturn(['content.txt', 'content.txt'],
      'hello');
    assert.strictEqual(
      headMain(mockReadFileSync, '-n', 1, 'content.txt', 'content.txt'),
      '==>content.txt<==\nhello\n\n==>content.txt<==\nhello\n');
  });

});
