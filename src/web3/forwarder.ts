import { ethers } from "ethers";
import { Forwarder as address } from '../deploy.json'
import abi from '../abi/Forwarder.json'
import { Web3Provider } from "@ethersproject/providers";
import { Forwarder } from "../../typechain-types";

export function createForwarderInstance(provider: Web3Provider): Forwarder {
    return new ethers.Contract(address, abi, provider) as Forwarder
}