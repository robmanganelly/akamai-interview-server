const { expect } = require('chai');
const path = require('path');
const { unitTests } = require(path.join(__dirname, '..', 'utils', 'write-data.js'));

const { createGroups, giveRandomNetwork } = unitTests;

describe('createGroups', () => {
  it('should create an array of groups with the given names and random networks', () => {
    const names = ['Group A', 'Group B', 'Group C'];
    const groups = createGroups(names);

    expect(groups).to.be.an('array').with.lengthOf(names.length);

    groups.forEach((group) => {
      expect(group).to.be.an('object').with.keys('name', 'networks');
      expect(group.name).to.be.oneOf(names);
      expect(group.networks).to.be.an('array');
      expect(group.networks).to.have.lengthOf.at.least(1);
    });
  }); 
});

describe('giveRandomNetwork', () => {
  it('should return a string with a valid IP address', () => {
    const network = giveRandomNetwork();
    network.forEach((ip) => {
            expect(ip).to.be.a('string').that.matches(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
        });
  });
});
