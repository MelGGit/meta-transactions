import { ethers, waffle } from "hardhat";
import { expect } from "chai";
import { Recipient, Forwarder } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { signMetaTxRequest } from "../../src/web3/sendMetaTx";

async function deploy(name: string, ...params: any) {
    const Contract = await ethers.getContractFactory(name);
    return await Contract.deploy(...params).then(f => f.deployed());
  }

describe('Recipient Contract Test', async () => {
    let forwarder: Forwarder
    let recipient: Recipient
    let accounts: SignerWithAddress[]

    beforeEach(async() => {
        forwarder = await deploy('Forwarder') as Forwarder
        recipient = await deploy('Recipient', forwarder.address) as Recipient
        accounts = await ethers.getSigners()
    })
    it('only the trusted forwarder can call the contract', async() => {
        const sender = accounts[2]
        const recipientConnected = recipient.connect(sender)
        
        await expect(recipientConnected.addNewMessage('should produce error')).revertedWith('only the trusted forwarder can call this function')
    })
    
    it('saves a name using meta-transactions', async() => {
        const provider = waffle.provider
        const signer = provider.getSigner(2)
        const signerAddress = await signer.getAddress()
        const signerBalanceBeforeTx = await signer.getBalance()
        const relayer = accounts[3]
        const relayerBalanceBeforeTx = await relayer.getBalance()
        const forwarderConnected = forwarder.connect(relayer)

        const { request, signature} = await signMetaTxRequest(signer, forwarderConnected, {
            from: signerAddress,
            to: recipient.address,
            data: recipient.interface.encodeFunctionData('addNewMessage', ['send-meta-tx'])
        })

        expect(await forwarderConnected.executeDelegate(request, signature)).to.emit(recipient, 'MessagePersisted').withArgs(signerAddress, 'send-meta-tx')
        expect(await recipient.addressToMessage(signerAddress)).to.equal('send-meta-tx')
        expect(await signer.getBalance()).to.equal(signerBalanceBeforeTx)
        expect(await relayer.getBalance()).to.not.equal(relayerBalanceBeforeTx)
    })
})