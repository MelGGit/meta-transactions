import { ethers } from "ethers";
import { Message as address } from '../deploy.json'
import abi from '../abi/Message.json'
import { Web3Provider } from "@ethersproject/providers";

export function createInstance(provider: Web3Provider) {
    return new ethers.Contract(address, abi, provider)
}