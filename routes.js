
module.exports = function(repository) {
  var bookRepository = repository;
  return {
    handleStockGet: (req, res, next) => {
      bookRepository.findOne(req.params.id).then( (doc) => {
        if (doc.length == 0) {
          return Promise.reject({status: 404, message: 'Not found'});
        } else {
          res.json(doc[0]);
        }
      }).catch((err) => {
        next(err);
      } )
    },
    handleStockPost: (req, res, next) => {
      bookRepository.stockUp(req.body.isbn, req.body.count)
        .then( (doc) => {
          res.json(req.body);
        }).catch((err) => {
          next(err);
        });
    }
  }
}
