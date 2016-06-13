var bookRepository = require('./repository');
var routes = require('./routes')(bookRepository);
var app = require('./inventory')(routes);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
