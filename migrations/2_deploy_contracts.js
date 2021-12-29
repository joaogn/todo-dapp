const SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports =  function (deployer) { 
  const forwarder = require('../build/gsn/Forwarder.json').address
  if (!forwarder) {
    throw new Error('no valid forwarder for network ' + network)
  }
  deployer.deploy(SimpleStorage, forwarder, { gas: 2.6e6 })
};
