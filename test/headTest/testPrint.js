const { print } = require('../../src/headSrc/print.js');
const assert = require('assert');

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

describe('print', () => {
  it('shoud print with out format for single headed content', () => {
    const logActual = ['hello'];
    const logExp = [];
    const mockedLog = mockConsoleLog(logExp, logActual);
    const mockedError = mockConsoleError(['error']);
    const headContents = [{ file: 'a.txt', content: 'hello', hasRead: true }];
    print(mockedLog, mockedError, headContents);
    assert.deepStrictEqual(logActual, logExp);
  });

  it('should print with  format for  headed content', () => {
    const logActual = ['==>a.txt<==\nhello', '==>b.txt<==\nhai'];
    const logExp = [];
    const mockedLog = mockConsoleLog(logExp, logActual);
    const mockedError = mockConsoleError(['error']);
    const headContents = [
      { file: 'a.txt', content: 'hello', hasRead: true },
      { file: 'b.txt', content: 'hai', hasRead: true }
    ];
    print(mockedLog, mockedError, headContents);
    assert.deepStrictEqual(logActual, logExp);
  });

  it('should print the error in sequence from std error', () => {
    const logActual = ['==>a.txt<==\nhello', '==>b.txt<==\nhai'];
    const logExp = [];
    const mockedLog = mockConsoleLog(logExp, logActual);
    const errorActual = ['head: c.txt: No such file or directory\n'];
    const errorExp = [];
    const mockedError = mockConsoleError(errorExp, errorActual);
    const headContents = [
      { file: 'a.txt', content: 'hello', hasRead: true },
      {
        file: 'c.txt', content: '', hasRead: false,
        message: 'head: c.txt: No such file or directory'
      },
      { file: 'b.txt', content: 'hai', hasRead: true }
    ];
    print(mockedLog, mockedError, headContents);
    assert.deepStrictEqual(logActual, logExp);
    assert.deepStrictEqual(errorActual, errorExp);
  });

});
