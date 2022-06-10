import { ethers } from "ethers";
import { Recipient as address } from '../deploy.json'
import abi from '../abi/Recipient.json'
import { Web3Provider } from "@ethersproject/providers";
import { Recipient } from "../../typechain-types";

export function createRecipientInstance(provider: Web3Provider): Recipient {
    return new ethers.Contract(address, abi, provider) as Recipient
}