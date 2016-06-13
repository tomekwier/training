'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    bookRepository = require('./repository');

var app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('new request at ' + new Date());
  next();
});

app.get('/stock/:id', (req, res, next) => {
  bookRepository.findOne(req.params.id).then( (doc) => {
    if (doc.length == 0) {
      return Promise.reject({status: 404, message: 'Not found'});
    } else {
      res.json(doc[0]);
    }
  }).catch((err) => {
    next(err);
  } )
});

app.post('/stock', (req, res, next) => {
  bookRepository.stockUp(req.body.isbn, req.body.count)
    .then( (doc) => {
      res.json(req.body);
    }).catch(next);  
});

app.use(clientError);
app.use(serverError);

function clientError(err, req, res, next) {
  next(err);
}

function serverError(err, req, res, next) {
  console.log(err.status);
  res.status(err.status || 500).send(err.message);
}

module.exports = app;
