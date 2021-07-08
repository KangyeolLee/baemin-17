const Datastore = require("nedb");
const db = new Datastore({ filename: "./db/user.db", autoload: true });

const insert = async function (data) {
  const result = await new Promise((resolve, reject) => {
    db.insert(data, function (err, newData) {
      if (err) reject(err);
      resolve(newData);
    });
  });

  return result;
};

const find = async function (query) {
  const result = await new Promise((resolve, reject) => {
    db.find(query, function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });

  return result;
};

module.exports = {
  insert,
  find,
};
