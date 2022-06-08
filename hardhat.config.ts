import 'hardhat-abi-exporter';
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  solidity: {
    compilers : [{ version: "0.8.9", settings: {}}]
  },
  networks: {
    hardhat: {}
  }
}

export default config;
