var assert = require('assert');

describe('Math in JS', () => {
  it ('synchronous', () =>  {
    assert.equal(1 + 1, 2);
  });
});

describe('Math in JS', () => {
  it ('asynchronous', (done) =>  {
    setTimeout( () => {
      assert.equal(1 + 1, 2);
      done();
    }, 100);
  });
});
