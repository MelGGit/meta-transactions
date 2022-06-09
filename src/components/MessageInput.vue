<script setup lang="ts">
import { Message } from '../../typechain-types/Message'
import { ethers } from 'ethers';
import { ref } from 'vue'
import { Message as messageAddress } from '../deploy.json'
import messageAbi from '../abi/Message.json'

const isSending = ref(false)
const message = ref('')

const sendTransaction = async() => {
    isSending.value = true
    try {
        const { ethereum } = window
        const accounts = await ethereum.request({ method: 'eth_requestAccounts'})
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const messagContract = new ethers.Contract(messageAddress, messageAbi, signer) as Message
        const resulttx = await messagContract.addNewMessage(message.value)
        const receipt = await resulttx.wait()
        console.log(receipt)
        messagContract.on('NewMessage', (address, message) => console.log(address, message))
        const result2 = await messagContract.addressToMessage('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')
        console.log(result2)
        const events = await messagContract.queryFilter(messagContract.filters.NewMessage())
        console.log(events)
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
 <div>
     <form @submit.prevent="sendTransaction">
        <input type="text" v-model="message" />
        <button type="submit" :disabled="isSending">{{isSending? 'Sending...' : 'Send Message'}}</button>
     </form>
 </div>
</template>