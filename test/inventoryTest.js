var assert = require('assert');
var application = require('../inventory');
var request = require('supertest');

var repositoryMock = function () {
  var books = [];
  return {
    stockUp: (isbn, count) => {
      var book = {isbn: isbn, count: count};
      books.push(book);
      return Promise.resolve(book);
    },
    findOne: (isbn) => {
      return books.find((b) => {
        return b.isbn == isbn;
      })
    }
  }
};

var app = application(repositoryMock());

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

describe('POST /stock', function() {
  var request1 = {isbn: 'abcd', count:10}; 
  it('post new book to the server', function(done) {
    request(app)
      .post('/stock')
      .set('Content-Type', 'application/json')
      .send(request1)
      .expect(200, request1, done);
  });
});
