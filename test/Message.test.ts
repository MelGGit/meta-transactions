
import { ethers } from "hardhat";
import { expect } from "chai";
import { Recipient, Recipient__factory } from '../typechain-types'


describe('Recipient Unit Test', () => {
    it('should add value', async() => {
        const Recipient = await ethers.getContractFactory('Recipient') as Recipient__factory
        const recipient = await Recipient.deploy() as Recipient
        await recipient.deployed()
        
        const addNewRecipientTx = await recipient.addNewMessage('Hello')
        await addNewRecipientTx.wait()
        const test = await recipient.addressToMessage('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
        console.log(test)
        expect(await recipient.addressToMessage('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')).to.equal('Hello')
        expect(await recipient.addressToMessage('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')).to.equal('')
    })
})