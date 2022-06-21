import { ethers } from "ethers";
import { Recipient as address } from '../deploy.json'
import abi from '../abi/Recipient.json'
import { JsonRpcProvider } from "@ethersproject/providers";
import { Recipient } from "../../typechain-types";

export function createRecipientInstance(provider: JsonRpcProvider): Recipient {
    return new ethers.Contract(address, abi, provider) as Recipient
}