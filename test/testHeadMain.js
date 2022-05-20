const assert = require('assert');

const headMain = (content) => content;

describe('headMain', () => {
  it('should give single line', () => {
    assert.deepStrictEqual(headMain(['hello']), ['hello']);
    assert.deepStrictEqual(headMain(['bye']), ['bye']);
  });
});
