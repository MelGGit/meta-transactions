
import { ethers } from "hardhat";
import { expect } from "chai";
import { Message, Message__factory } from '../typechain-types'


describe('Message Unit Test', () => {
    it('should add value', async() => {
        const Message = await ethers.getContractFactory('Message') as Message__factory
        const message = await Message.deploy() as Message
        await message.deployed()
        
        const addNewMessageTx = await message.addNewMessage('Hello')
        await addNewMessageTx.wait()
        const test = await message.addressToMessage('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
        console.log(test)
        expect(await message.addressToMessage('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')).to.equal('Hello')
        expect(await message.addressToMessage('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')).to.equal('')
    })
})