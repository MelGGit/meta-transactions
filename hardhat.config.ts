import 'hardhat-abi-exporter';
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

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
    hardhat: {}
  }
}

export default config;
