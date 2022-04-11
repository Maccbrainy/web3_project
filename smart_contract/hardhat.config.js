require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const { ALCHEMY_HTTP_ROPSTEN_API_KEY, METAMASK_PRIVATE_KEY } = process.env;
module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url:`${ALCHEMY_HTTP_ROPSTEN_API_KEY}`,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`]
    }
  }
};
