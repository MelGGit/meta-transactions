import { Handler, HandlerContext, HandlerEvent } from "@netlify/functions"
import { ethers } from "ethers"
const { INFURA_API_KEY } = process.env
import { Recipient as recipientAddress } from '../src/deploy.json'
import RecipientAbi from '../src/abi/Recipient.json'
import { Recipient } from "./../typechain-types";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    const provider = ethers.getDefaultProvider(`https://ropsten.infura.io/v3/${INFURA_API_KEY}`)
    const recipient = new ethers.Contract(recipientAddress, RecipientAbi, provider) as Recipient
    const pastMessages = await recipient.queryFilter(recipient.filters.MessagePersisted())
    const sortedMessages = pastMessages.reverse()

    return {
        statusCode: 200,
        body: JSON.stringify(sortedMessages)
    }
}

export { handler } 