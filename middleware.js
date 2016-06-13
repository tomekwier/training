module.exports = {
  logRequest: (req, res, next) => {
    console.log('incoming request at ' + new Date());
    next();
  },

  clientError: (err, req, res, next) => {
    next(err);
  },

  serverError: (err, req, res, next) => {
    console.log(err.status);
    res.status(err.status || 500).send(err.message);
  }
};
