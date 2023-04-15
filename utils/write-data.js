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
    let arrBase = Math.floor(Math.random() * 10);
    return new Array(arrBase > 0 ? arrBase : 1).fill(1).map(
      ip=>`${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`
    );
  }


  module.exports.unitTests = {
    createGroups,giveRandomNetwork
  }