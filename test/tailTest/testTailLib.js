const assert = require('assert');
const { char, lines, tailMain, separateFlags }
  = require('../../src/tailSrc/tailLib.js');
const { shouldReturn } = require('../headTest/testHeadMain.js');
const { mockConsoleError, mockConsoleLog } =
  require('../headTest/testPrint.js');

describe('char', () => {
  it('should give the last single character ', () => {
    assert.deepStrictEqual(char('hello', -1), 'o');
  });
  it('should give the last two characters', () => {
    assert.deepStrictEqual(char('hello', -2), 'lo');
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
  it('should seperate self flags and rest of flag', () => {
    assert.deepStrictEqual(separateFlags(['-n', '-q']), [['-q'], ['-n']]);
    assert.deepStrictEqual(separateFlags(['-q', '-c']), [['-q'], ['-c']]);
    assert.deepStrictEqual(separateFlags(['-q', '-r', '-n', '-c']),
      [['-q', '-r'], ['-n', '-c']]);
  });
});
