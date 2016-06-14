'use strict'

var mongodb = require('mongodb').MongoClient;

// Mongo
var dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:30000/bookinventory';

var p = mongodb.connect(dbUrl, {db: {bufferMaxEntries: 0}}).then((db) => {
  return db.collection('books');
}).catch((err) => {
  console.log(err);
  process.exit(1);
});

module.exports = {
  stockUp: (isbn, count) => {
    return p.then ( (col) => {
      return col.updateOne(
        {
          isbn: isbn
        },
        {
          isbn: isbn,
          count: count
        },
        {
          upsert: true
        });
    })
  },
  findOne: (isbn) => {
    return p.then( (col) => {
      return col.find({isbn: isbn}, {_id: null, isbn:null}).toArray();
    })
  }
};
