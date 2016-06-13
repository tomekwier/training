var bookRepository = require('./repository');
var app = require('./inventory')(boookRepository);

app.listen(3000, function () {
  console.log('Listening on port 3000');
});
