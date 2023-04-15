const { expect, assert } = require('chai');
const path = require('path');
const { randNames } = require('../utils/rand-words');
const { unitTests } = require(path.join(__dirname, '..', 'utils', 'write-data.js'));

const { createAccountIds, createGroups, giveRandomNetwork, prefixAndKey, createAccountGroups } = unitTests;

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

describe('prefixAndKey', () => {
  // Test case 1
  it('should return a string', () => {
    const result = prefixAndKey('John Doe');
    expect(result).to.be.a('string');
  });

  // Test case 2
  it('should return a string with the correct format', () => {
    const result = prefixAndKey('John Doe');
    const regex = /^[a-z]+_[a-z0-9]{7}$/; // Regex pattern to match the format
    expect(result).to.match(regex);
  });

  // Test case 3
  it('should return a different result for different input', () => {
    const result1 = prefixAndKey('John Doe');
    const result2 = prefixAndKey('Jane Smith');
    expect(result1).to.not.equal(result2);
  });

  it('should return a different result for same input', () => {
    const result1 = prefixAndKey('John Doe');
    const result2 = prefixAndKey('John Doe');
    expect(result1).to.not.equal(result2);
  });
});

describe('createAccountGroups', () => {
  it('should return an array with two elements', () => {
    const result = createAccountGroups(['John Doe', 'Jane Smith']);
    expect(result).to.be.an('array').with.lengthOf(2);
  });
  it('should return an object as the first element of the array', () => {
    const result = createAccountGroups(['John Doe', 'Jane Smith']);
    expect(result[0]).to.be.an('object');
  });
  it('should return an array of strings as the second element of the array', () => {
    const result = createAccountGroups(['John Doe', 'Jane Smith']);
    expect(result[1]).to.be.an('array').of.string;
  });
  it('should return an object with the correct structure', () => {
    const result = createAccountGroups(['John Doe', 'Jane Smith']);
    const keys = Object.keys(result[0]);
    expect(keys).to.have.members(['John Doe', 'Jane Smith']);
    expect(result[0][keys[0]]).to.be.an('array').of.string;
    expect(result[0][keys[1]]).to.be.an('array').of.string;
  });
  it('should return an array of strings with the correct format', () => {
    const result = createAccountGroups(['John Doe', 'Jane Smith']);
    const regex = /^[a-z]+_[a-z0-9]{7}$/; // Regex pattern to match the format
    // expect(result[1]).to.all.match(regex);
    result[1].forEach((str) => {
      expect(str).to.match(regex);
    });
  });
});


describe('createAccountIds', () => {
  it('should return an object', () => {
    const names = ['John', 'Mary', 'David'];
    const result = createAccountIds(names);
    expect(result).to.be.an('object');
  });

  it('should return an object with keys equal to the input names', () => {
    const names = ['John', 'Mary', 'David'];
    const result = createAccountIds(names);
    expect(Object.keys(result)).to.have.members(names);
  });

  it('should return an object with values in the correct format', () => {
    const names = ['John', 'Mary', 'David'];
    const result = createAccountIds(names);
    const pattern = /^[0-9a-f]{4}-[0-9a-f]{4}$/;
    Object.values(result).forEach((id) => {
      expect(id).to.match(pattern);
    });
  });
});

describe('randNames', () => {
  it('should return a string with two random names separated by a space', () => {
    const name = randNames();
    assert.match(name, /^[a-z]+ [a-z]+$/i, 'name format is incorrect');
  });

  it('should return unique names on each call', () => {
    const name1 = randNames();
    const name2 = randNames();
    console.log(name1, name2);
    assert.notEqual(name1, name2, 'names are not unique');
  });
});

