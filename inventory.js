'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var middleware = require('./middleware');

module.exports = function(repository) {
  var app = express();
  var routes = require('./routes')(repository);
  
  app.use(bodyParser.json());

  app.use(middleware.logRequest);

  app.get('/stock/:id', routes.handleStockGet);
  app.post('/stock', routes.handleStockPost);

  app.use(middleware.clientError);
  app.use(middleware.serverError);

  return app;
};
