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
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    const provider = ethers.getDefaultProvider('http://localhost:8545')
    const connectedWallet = wallet.connect(provider)
    const forwarderContract = new ethers.Contract(Forwarder, ForwarderAbi, connectedWallet)
    const contractTx = await forwarderContract.executeDelegate(req.body)
    let transactionReceipt = null
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    while(transactionReceipt == null) {
        transactionReceipt = await provider.getTransactionReceipt(contractTx.hash)
        await sleep(1000)
    }
    console.log('final', transactionReceipt)
    return transactionReceipt
})

app.listen(3000, () => console.log('listening on port 3000!'))