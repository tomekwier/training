'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    repository = require('./repository');

var bookRepository = repository();

var app = express();
app.use(bodyParser.json());

function createLibrary() {
  var books = {};
  return {
    books: books,
    add: (isbn, count)  => {
      if (books.hasOwnProperty(isbn)) {
        books[isbn] += count;
      } else {
        books[isbn] = count;
      }
    },
    getBookCount: (isbn) => {
      return books[isbn];
      }
    }
  }

var library = createLibrary();

app.use((req, res, next) => {
  console.log('new request at ' + new Date());
  next();
});

app.get('/stock/:id', (req, res, next) => {
  bookRepository.findOne(req.params.id).then( (doc) => {
    res.json(doc[0]);
  }).catch(next)
});

app.post('/stock', (req, res, next) => {
  bookRepository.stockUp(req.body.isbn, req.body.count)
    .then( (doc) => {
      res.json(req.body);
    }).catch(next);  
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(clidentError);
app.use(serverError);

function clidentError(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function serverError(err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500).send('Something broke');
}

module.exports = app;
