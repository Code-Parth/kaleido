require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const fs = require("fs");
const privateKey = fs.readFileSync(".secretKey").toString();

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 1337
        },
        polygon_mumbai: {
            url: 'https://polygon-mumbai-pokt.nodies.app',
            accounts: [privateKey]
        },
        core_testnet: {
            url: 'https://rpc.test.btcs.network',
            accounts: [privateKey]
        },
    },
    solidity: {
        version: "0.8.4",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
};