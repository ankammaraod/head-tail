const { headMain, headOfFile, lines } = require('../../src/headSrc/headLib.js');
const { mockConsoleLog, mockConsoleError } =
  require('../headTest/testPrint.js');
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

    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    const ActualContent = ['hello'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    headMain(
      mockReadFileSync,
      mockedConsoleLog,
      mockedConsoleError,
      'a.txt'
    );

    assert.deepStrictEqual(ActualContent, expContent);
  });

  it('should give the single character from single file', () => {
    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    const ActualContent = ['h'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    headMain(
      mockReadFileSync,
      mockedConsoleLog,
      mockedConsoleError,
      '-c1', 'a.txt'
    );

    assert.deepStrictEqual(ActualContent, expContent);
  });

  it('should give the single line from two file', () => {
    const mockReadFileSync = shouldReturn(['a.txt', 'b.txt'], 'hello');
    const ActualContent = ['==>a.txt<==\nhello', '==>b.txt<==\nhello'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    headMain(
      mockReadFileSync,
      mockedConsoleLog,
      mockedConsoleError,
      '-n1', 'a.txt', 'b.txt'
    );

    assert.deepStrictEqual(ActualContent, expContent);
  });

});

describe('headOFFile', () => {
  it('should give head contents of a file in structured way ', () => {
    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    assert.deepStrictEqual(
      headOfFile('a.txt', lines, 1, mockReadFileSync),
      {
        file: 'a.txt',
        content: 'hello',
        hasRead: true
      }
    );
  });

  it('should give error message for file not exist ', () => {
    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    assert.deepStrictEqual(
      headOfFile('b.txt', lines, 1, mockReadFileSync),
      {
        file: 'b.txt',
        hasRead: false,
        message: 'head: b.txt: No such file or directory'
      }
    );
  });
});

exports.shouldReturn = shouldReturn;
