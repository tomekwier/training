var assert = require('assert');
var request = require('supertest');
var app = require('../inventory')(require('../inMemoryRepository')());

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
