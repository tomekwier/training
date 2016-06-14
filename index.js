var bookRepository = require('./repository');
var routes = require('./routes')(bookRepository);
var app = require('./inventory')(routes);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
