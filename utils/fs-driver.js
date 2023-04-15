const { readFile,writeFileSync } = require("fs");
const path = require("path");


 async function readDB(filename=undefined) {
  const __path = path.join(__dirname, "..", "data", `${!filename ? "data.json":filename}`);
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


function writeJsonToFile(data){
  const __path = path.join(__dirname, "..", "data","data.json");
  writeFileSync(__path, JSON.stringify(data));
}

async function resetDB() {
  try{
    const data = await readDB("data copy.json");
    writeJsonToFile(data);
    return true;
  }catch(err){
    console.log(err);
    return false;
  }
}

module.exports = { readDB, writeJsonToFile, resetDB };