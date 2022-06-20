import 'hardhat-abi-exporter';
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
require('dotenv').config()

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  abiExporter: {
    path: './src/abi',
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  solidity: {
    version: "0.8.9"
  },
  networks: {
    hardhat: {},
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.VITE_INFURA_API_KEY}`,
      accounts: [`${process.env.DEPLOY_PRIVATE_KEY}`]
    }
  }
}

export default config;
