const { readFile } = require("fs");
const path = require("path");

module.exports.readDB = async function () {
  return new Promise((resolve, reject) => {
    readFile(
      path.join(__dirname, "..", "data", "data.json"),
      "utf8",
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      }
    );
  });
};

