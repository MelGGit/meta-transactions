<script setup lang="ts">
import { Message } from '../../typechain-types/Message'
import { ethers } from 'ethers';
import { ref } from 'vue'
import { Message as messageAddress } from '../deploy.json'
import messageAbi from '../abi/Message.json'
import { sendMessage } from '../web3/sendMetaTx';

const isSending = ref(false)
const message = ref('')

const sendTransaction = async() => {
    isSending.value = true
    try {
        const test = await sendMessage(message.value)
    isSending.value = false
    } catch (error) {
        console.log(error)
        isSending.value = false
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