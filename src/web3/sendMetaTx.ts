import { ethers } from "ethers";
import { createForwarderInstance } from "./forwarder";
import { createRecipientInstance } from "./recipient";
import { createProvider } from "./provider";
import { Forwarder, Recipient, Recipient__factory } from "../../typechain-types";
import { JsonRpcSigner, Provider, Web3Provider } from "@ethersproject/providers";
import { ForwardRequestType, FullTypedDataType, TypedDataType } from "../types/web3types";

export async function sendMessage(message: string) {
    if(!message || message.length < 1) throw new Error('Name cannot be empty')
    if(!window.ethereum) throw new Error('No wallet installed')

    const { ethereum } = window
    await ethereum.request({ method: 'eth_requestAccounts' })
    const userProvider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = createProvider()
    const signer = userProvider.getSigner()
    const recipient = createRecipientInstance(userProvider)

    return await sendMetaTx(recipient, provider, signer, message)
}

async function sendMetaTx(recipient: Recipient, provider:Web3Provider, signer: JsonRpcSigner, message: string ) {
    const forwarder = createForwarderInstance(provider)
    const from = await signer.getAddress()
    // The delegate call function gets encoded with the argument for later usage in the forwarder contract
    const data = recipient.interface.encodeFunctionData('addNewMessage', [message])
    const to = recipient.address
    const request = await signMetaTxRequest(signer, forwarder, { to, from, data})
    const response = await fetch('http://localhost:4000/relayTransaction',{ 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(request)
    })
    const responseData = await response.json()
    return responseData
}

export async function signMetaTxRequest(signer: JsonRpcSigner, forwarder: Forwarder, input: {to: string, from: string, data: string}) {
    const request = await buildRequest(forwarder, input)
    const toSign = await buildTypedData(forwarder, request)
    const signature = await signTypedData(signer, input.from, toSign)
    return { signature, request }
}

async function buildRequest(forwarder: Forwarder, input: {to:string, from: string, data: string}): Promise<ForwardRequestType> {
    const nonce = await forwarder.getNonce(input.from).then(nonce => nonce.toString())
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

async function signTypedData(signer:JsonRpcSigner, from: string, data: FullTypedDataType): Promise<string> {
    return await signer.provider.send('eth_signTypedData_v4', [from, JSON.stringify(data)])
}