const assert = require('assert');
const { tail, char, lines } = require('../../src/tailSrc/tailLib.js');
describe.only('tail', () => {
  it('should give the last characters ', () => {
    assert.deepStrictEqual(tail(char, 'hello', 1), 'o');
    assert.deepStrictEqual(tail(char, 'hello', 2), 'lo');
  });
  it('should give the last lines ', () => {
    assert.deepStrictEqual(tail(lines, 'hello\nhai', 1), 'hai');
    assert.deepStrictEqual(tail(lines, 'hello\nhai', 2), 'hello\nhai');
  });
});

