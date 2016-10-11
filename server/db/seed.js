"use strict";

require('dotenv').config();
const db     = require('../lib/db'),
      tweets = require("./tweets");

db.connect((db) => {

  db.collection("tweets").remove({}, false, (err, results) => {
    if (err) throw err;

    db.collection("tweets").insertMany(tweets, (err, results) => {
      if (err) throw err;

      db.collection("tweets").count({}, (err, results) => {
        if (err) throw err;

        db.close();
      });

    });
  });
});
