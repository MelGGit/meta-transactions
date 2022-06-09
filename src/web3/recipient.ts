import { ethers } from "ethers";
import { Message as address } from '../deploy.json'
import abi from '../abi/Message.json'
import { Web3Provider } from "@ethersproject/providers";
import { Message } from "../../typechain-types";

export function createRecipientInstance(provider: Web3Provider): Message {
    return new ethers.Contract(address, abi, provider) as Message
}