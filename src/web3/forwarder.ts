import { ethers } from "ethers";
import { Forwarder as address } from '../deploy.json'
import abi from '../abi/Forwarder.json'
import { JsonRpcProvider } from "@ethersproject/providers";
import { Forwarder } from "../../typechain-types";

export function createForwarderInstance(provider: JsonRpcProvider): Forwarder {
    return new ethers.Contract(address, abi, provider) as Forwarder
}