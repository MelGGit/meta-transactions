import { ethers } from "ethers";

export function createProvider() {
    return new ethers.providers.Web3Provider(window.ethereum)
}