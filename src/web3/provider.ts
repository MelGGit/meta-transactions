import { ethers } from "ethers";

export function createProvider() {
    return new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/cee60bd9cbdf4097bb931e2106830b0f`)
}