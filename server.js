const express = require('express')
const ForwarderAbi = require('./src/abi/Forwarder.json')
const { Forwarder } = require('./src/deploy.json')
const ethers = require('ethers')
const { waitForDebugger } = require('inspector')
require('dotenv').config()


const app = express()
// console.log(process.env.PRIVATE_KEY)
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.post('/relayTransaction', async (req, res) => {

    const types = {
        ForwardRequest: [
            { name: 'from', type: 'address' },
            { name: 'to', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'gas', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'data', type: 'bytes' },
          ]
        }

    const domain = {
            name: 'Forwarder',
            version: '0.0.1',
            chainId: 31337,
            verifyingContract: Forwarder,
            }

    const { request, signature } = req.body
    const verifiedAddress = ethers.utils.verifyTypedData(domain, types, request, signature)
    if(request.from !== verifiedAddress) {
        return res.status(400).send({
            message: 'The Transaktion could not get verified.'
        })
    }
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const provider = ethers.getDefaultProvider('http://localhost:8545')
    const connectedWallet = wallet.connect(provider)
    const forwarderContract = new ethers.Contract(Forwarder, ForwarderAbi, connectedWallet)
    const contractTx = await forwarderContract.executeDelegate(request)
    let transactionReceipt = null
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    while(transactionReceipt == null) {
        transactionReceipt = await provider.getTransactionReceipt(contractTx.hash)
        await sleep(1000)
    }
    console.log('final', transactionReceipt)
    return res.status(204).send(transactionReceipt)
})

app.listen(3000, () => console.log('listening on port 3000!'))