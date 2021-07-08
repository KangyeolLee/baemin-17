const Datastore = require("nedb");
const db = new Datastore({ filename: "./db/user.db", autoload: true });

const insert = function (data) {
  db.insert(data, function (err, newData) {
    console.log("inserted : ", newData);
  });
};

const find = function (query) {
  db.find(query, function (err, target) {
    console.log("found : ", target);
  });
};

module.exports = {
  insert,
  find,
};
