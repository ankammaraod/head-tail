const assert = require('assert');
const { tail } = require('../../src/tailSrc/tailLib.js');
describe.only('tail', () => {
  it('should give the last lines ', () => {
    assert.deepStrictEqual(tail('hello'), 'hello');
    assert.deepStrictEqual(tail('hai'), 'hai');
  });
});
