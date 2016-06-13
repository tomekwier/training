'use strict';

var express = require('express'),
    bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
  throw new Error('we are doomed');
  res.send("Hello world");
});

app.get('/stock/:id', (req, res, next) => {
  res.send(JSON.stringify({count: library.getBookCount(req.params.id)}));
});

app.post('/stock', (req, res, next) => {
  var bookCount = Number(req.body.count);
  library.add(req.body.isbn, bookCount);
  res.send(JSON.stringify({isbn: req.body.isbn, count: req.body.count}));
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
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
