const { readDB, writeJsonToFile } = require("./fs-driver");
const { randNames } = require("./rand-words");

module.exports.writeDB = async (times, replace = false) => {
  try {
    let oldState = await readDB();
    console.log({ oldState });
    let newState = performHandling(oldState, times, replace);
    writeJsonToFile(newState);
    return true;
  } catch (e) {
    return false;
  }
};

function performHandling(oldState, times, replace = false) {
  // create the object
  // assign properties
  // if replace, write the file with the new object
  // else merge with previous object
  // write the file
  let newData = Object.create(null);
  let __names = new Array(times).fill(1).map((nil) => randNames());
  console.log({ __names });
  let _accIds = createAccountIds(__names);
  let [_accGr, flatMap] = createAccountGroups(Object.keys(_accIds)); //[{},[]]
  let _groups = createGroups(flatMap);

  console.log({ _accIds, _accGr, _groups });

  if (replace) {
    console.log("replacing");
    newData = { accountIds: _accIds, accountGroups: _accGr, groups: _groups };
    return newData;
  } else {
    return {
      accountIds: {
        ..._accIds,
        ...oldState.accountIds,
      },
      accountGroups: {
        ..._accGr,
        ...oldState.accountGroups,
      },
      groups: [..._groups, ...oldState.groups],
    };
  }
}

function createAccountIds(names) {
  return Object.fromEntries(
    names.map((n) => [
      n,
      `${Math.random().toString(16).slice(2, 6)}-${Math.random()
        .toString(16)
        .slice(2, 6)}`,
    ])
  );
}

function createAccountGroups(names) {
  let groups = names.map((name) => [
    name,
    new Array(Math.ceil(Math.random() * 10))
      .fill(1)
      .map((i) => prefixAndKey(name)),
  ]);
  let accGr = Object.fromEntries(groups);
  return [accGr, groups.map((g) => g[1]).flat()];
}

/**
 *
 * @param {string } name
 * @returns {string} a random prefix and key
 */
function prefixAndKey(name) {
  return `${name
    .split(" ")
    .map((word) => word.slice(0, -1).toLowerCase())
    .join("")}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * to be used inside createAccountGroups only
 * @param {string[]} names
 * @returns {object[]} an array of groups (name and networks)
 */
function createGroups(names) {
  return names.map((name) => ({ name, networks: giveRandomNetwork() }));
}

/**
 * to be used inside createGroups only
 * @returns {string} a random networks[]
 */
function giveRandomNetwork() {
  return new Array(Math.ceil(Math.random() * 10))
    .fill(1)
    .map(
      (ip) =>
        `${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}.${Math.floor(Math.random() * 255)}.${Math.floor(
          Math.random() * 255
        )}`
    );
}

module.exports.unitTests = {
  createGroups,
  giveRandomNetwork,
  prefixAndKey,
  createAccountGroups,
  createAccountIds,
};
