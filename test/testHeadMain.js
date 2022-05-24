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

const mockConsoleLog = (logExp, logActual) => {
  let index = 0;
  return function (content) {
    assert.ok(index < logActual.length);
    assert.deepStrictEqual(content, logActual[index]);
    logExp.push(logActual[index]);
    index++;
  };
};
const mockConsoleError = (errorExp, errorActual) => {
  let index = 0;
  return function (content) {
    assert.ok(index < errorActual.length);
    assert.deepStrictEqual(content, errorActual[index]);
    errorExp.push(errorActual[index]);
    index++;
  };
};

describe.only('HeadMain', () => {
  it('should give the lines up to 10 by default from single file', () => {

    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    const ActualContent = ['hello'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    headMain(
      mockReadFileSync, mockedConsoleLog, mockedConsoleError, 'a.txt');
    assert.deepStrictEqual(ActualContent, expContent);
  });

  it('should give the single character from single file', () => {
    const mockReadFileSync = shouldReturn(['a.txt'], 'hello');
    const ActualContent = ['h'];
    const expContent = [];
    const mockedConsoleLog = mockConsoleLog(expContent, ActualContent);
    const mockedConsoleError = mockConsoleError([], []);

    headMain(
      mockReadFileSync, mockedConsoleLog, mockedConsoleError, '-c1', 'a.txt');
    assert.deepStrictEqual(ActualContent, expContent);
  });

});
