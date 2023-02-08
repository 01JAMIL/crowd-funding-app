const HDWalletProvider = require('truffle-hdwallet-provider')

require('dotenv').config()

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 5000000
    },

    goerli: {
      networkCheckTimeout: 999999,
      provider: () => {
        return new HDWalletProvider(process.env.PRIVATE_KEY, process.env.END_POINT + process.env.API_KEY)
      },
      network_id: '5',
      gas: 4465030,
      gasPrice: 10000000000
    }
  },
  compilers: {
    solc: {
      settings: {
        optimizer: {
          enabled: true, // Default: false
          runs: 200      // Default: 200
        },
      },
      version: '^0.8.0'
    }
  }
};
