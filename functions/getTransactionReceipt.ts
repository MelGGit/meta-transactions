import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import { ethers } from "ethers"
const { INFURA_API_KEY } = process.env

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    if(!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Body is empty.'})
        }
    }
    const data = JSON.parse(event.body)
    const { txHash } = data
    const provider = ethers.getDefaultProvider(`https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
    const transaction = await provider.getTransaction(txHash)
    return {
        statusCode: 200,
        body: JSON.stringify(transaction)
    }
}

export { handler } 