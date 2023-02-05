const Donations = artifacts.require("Donations");

module.exports = function (deployer) {
  deployer.deploy(Donations);
};
