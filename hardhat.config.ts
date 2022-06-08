import 'hardhat-abi-exporter';
import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-waffle";

const config: HardhatUserConfig = {
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  solidity: {
    compilers : [{ version: "0.8.9", settings: {}}]
  }
}

export default config;
