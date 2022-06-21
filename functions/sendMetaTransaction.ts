import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import { ethers } from "ethers"
const { INFURA_API_KEY, RELAYER_PRIVATE_KEY } = process.env
import { Forwarder as forwarderAddress } from '../src/deploy.json'
import ForwarderAbi from '../src/abi/Forwarder.json'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    
    if(!RELAYER_PRIVATE_KEY) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Relayer Address not available.'})
        }
    }
    if(!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Body is empty.'})
        }
    }
    const data = JSON.parse(event.body)
    const { request, signature } = data
    const wallet = new ethers.Wallet(RELAYER_PRIVATE_KEY)
    const provider = ethers.getDefaultProvider(`https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
    const connectedWallet = wallet.connect(provider)

    const gasLimit = (parseInt(request.gas) + 50000).toString()

    // send transaction to forwarder contract
    const forwarderContract = new ethers.Contract(forwarderAddress, ForwarderAbi, connectedWallet)
    const contractTx = await forwarderContract.executeDelegate(request, signature, { gasLimit })
    // const transactionReceipt = await contractTx.wait()

    return {
        statusCode: 200,
        body: JSON.stringify({contractTx})
    }
}

export { handler } 