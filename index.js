var bookRepository = require('./repository');
var app = require('./inventory')(bookRepository);

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});
