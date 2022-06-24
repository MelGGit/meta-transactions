import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import { ethers } from "ethers"
const { INFURA_API_KEY, RELAYER_PRIVATE_KEY } = process.env

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    
    if(!RELAYER_PRIVATE_KEY) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Relayer Address not available.'})
        }
    }

    const wallet = new ethers.Wallet(RELAYER_PRIVATE_KEY)
    const provider = ethers.getDefaultProvider(`https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
    const connectedWallet = wallet.connect(provider)
    const address = await connectedWallet.getAddress()
    const balance = await connectedWallet.getBalance()


    return {
        statusCode: 200,
        body: JSON.stringify({address, balance})
    }
}

export { handler } 