import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import { ethers } from "ethers"
const { INFURA_API_KEY } = process.env
import { Forwarder as forwarderAddress, Recipient as recipientAddress } from '../src/deploy.json'
import ForwarderAbi from '../src/abi/Forwarder.json'
import RecipientAbi from '../src/abi/Recipient.json'
import { Forwarder, Recipient, Recipient__factory } from "./../typechain-types";
import { ForwardRequestType, FullTypedDataType, TypedDataType } from "../src/types/web3types";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    if(!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Body is empty.'})
        }
    }
    const bodyData: {from: string, message: string} = JSON.parse(event.body)
    const { from, message } = bodyData

    const provider = ethers.getDefaultProvider(`https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
    const recipient = new ethers.Contract(recipientAddress, RecipientAbi, provider) as Recipient
    const forwarder = new ethers.Contract(forwarderAddress, ForwarderAbi, provider) as Forwarder

    const data = recipient.interface.encodeFunctionData('addNewMessage', [message])
    const to = recipient.address

    const request = await buildRequest(forwarder, {to, from, data})
    const toSign = await buildTypedData(forwarder, request)


    return {
        statusCode: 200,
        body: JSON.stringify({toSign, request})
    }
}

async function buildRequest(forwarder: Forwarder, input: {to:string, from: string, data: string}): Promise<ForwardRequestType> {
    console.log(input.from)
    const nonce = await forwarder.getNonce(input.from).then((nonce) => nonce.toString())
    console.log(nonce)
    return {value: 0, gas: 1e6, nonce, ...input }
}

async function buildTypedData(forwarder: Forwarder, request: ForwardRequestType) {
    const chainId = await forwarder.provider.getNetwork().then(network => network.chainId)
    const typeData = getMetaTxTypeData(chainId, forwarder.address)
    return {...typeData, message: request}
}

function getMetaTxTypeData(chainId: number, forwarderAddress: string): TypedDataType {
  // setup to use the signedTypedData function from ethereum
    const EIP712Domain = [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ];
      
      const ForwardRequest = [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'gas', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
        { name: 'data', type: 'bytes' },
      ];
      return {
        types: {
          EIP712Domain,
          ForwardRequest,
        },
        domain: {
          name: 'Forwarder',
          version: '0.0.1',
          chainId,
          verifyingContract: forwarderAddress,
        },
        primaryType: 'ForwardRequest',
      }
}

export { handler } 