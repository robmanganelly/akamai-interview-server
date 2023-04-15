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
          console.log({ data });
          resolve(JSON.parse(data));
        }
      }
    );
  });
};







/**
 * to be used inside createAccountGroups only
 * @param {string[]} names
 * @returns {object[]} an array of groups (name and networks)
 */
function createGroups(names) {
  return names.map((name) => ({ name, networks: giveRandomNetwork()}));
}

/**
 * to be used inside createGroups only
 * @returns {string} a random networks[]
 */
function giveRandomNetwork() {
  return new Array(Math.floor(Math.random() * 10)).fill(1).map(
    ip=>`${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`
  );
}
