const assert = require('assert');
const { bytes, lines, tailMain, separateFlags }
  = require('../../src/tailSrc/tailLib.js');
const { shouldReturn } = require('../headTest/testHeadMain.js');
const { mockConsoleError, mockConsoleLog } =
  require('../headTest/testPrint.js');

describe('bytes', () => {
  it('should give the last single character ', () => {
    assert.deepStrictEqual(bytes('hello', -1), 'o');
  });
  it('should give the last two characters', () => {
    assert.deepStrictEqual(bytes('hello', -2), 'lo');
  });
});

describe('lines', () => {
  it('should give the last single character ', () => {
    assert.deepStrictEqual(lines('hello\nhai', -1), 'hai');
  });
  it('should give the last two characters', () => {
    assert.deepStrictEqual(lines('hello\nhai', -2), 'hello\nhai');
  });
});

//
describe('tailMain', () => {
  it('should give the lines up to 10 by default from single file', () => {

    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    const ActualContent = ['hello'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    tailMain(
      mockReadFileSync, mockedConsoleLog, mockedConsoleError, 'a.txt');
    assert.deepStrictEqual(ActualContent, expContent);
  });

  it('should give the single character from single file', () => {
    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    const ActualContent = ['o'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    tailMain(
      mockReadFileSync, mockedConsoleLog, mockedConsoleError, '-c1', 'a.txt');
    assert.deepStrictEqual(ActualContent, expContent);
  });

});

describe('separateFlags', () => {
  it('should separate self flags and rest of flag', () => {
    assert.deepStrictEqual(separateFlags(['-n', '-q']),
      { selfFlags: ['-q'], restOfArgs: ['-n'] });
    assert.deepStrictEqual(separateFlags(['-q', '-c']),
      { selfFlags: ['-q'], restOfArgs: ['-c'] });

    assert.deepStrictEqual(separateFlags(['-q', '-r', '-n', '-c']),
      { selfFlags: ['-q', '-r'], restOfArgs: ['-n', '-c'] });
  });
});
