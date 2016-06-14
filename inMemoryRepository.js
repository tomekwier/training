module.exports = function() {
  var books = [];
  return {
    stockUp: (isbn, count) => {
      var book = {isbn: isbn, count: count};
      books.push(book);
      return Promise.resolve(book);
    },
    findOne: (isbn) => {
      return books.find((book) => {
        return book.isbn == isbn;
      })
    }
  }
};
