const { readFile,writeFileSync } = require("fs");
const path = require("path");

const __path = path.join(__dirname, "..", "data", "data.json");

module.exports.readDB = async function () {
  return new Promise((resolve, reject) => {
    readFile(
      __path,
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


module.exports.writeJsonToFile = (data)=>{
  writeFileSync(__path, JSON.stringify(data));
}
