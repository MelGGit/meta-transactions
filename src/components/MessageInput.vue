<script setup lang="ts">
import { TransactionResponse } from '@ethersproject/providers';
import { ref } from 'vue'
import { sendMessage } from '../web3/sendMetaTx';

const isSending = ref(false)
const message = ref('')
const txHash = ref('')

const sendTransaction = async() => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://astounding-daifuku-0318c0.netlify.app/': 'http://localhost:8888/'
    isSending.value = true
    try {
        const { contractTx } = await sendMessage(message.value)
        txHash.value = contractTx.hash
        let transaction
        const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
        while(!transaction || transaction.confirmations === 0) {
            const transactionRequest = await fetch(`${apiUrl}.netlify/functions/getTransactionReceipt`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({txHash: contractTx.hash})
            })
            transaction = await transactionRequest.json()
            await sleep(5000)
        }
        message.value = ''
        isSending.value = false
    } catch (error) {
        console.log(error)
        isSending.value = false
    }
}

</script>   

<template>
 <div class="rounded-xl shadow-lg p-4 bg-white flex gap-2 flex-col">
     <form @submit.prevent="sendTransaction" class="flex gap-8">
        <input type="text" v-model="message" class="border-gray-400 border rounded-xl px-4" />
        <button class="bg-green-600 rounded-xl w-36 px-4 py-2 hover:bg-green-700 hover:disabled:bg-green-600  disabled:opacity-80" type="submit" :disabled="isSending || message.length < 1">{{isSending? 'Sending...' : 'Send Message'}}</button>
     </form>
     <button class="bg-[#1d2230] text-white rounded-xl w-36 px-4 py-2 disabled:opacity-30" :disabled="txHash.length < 1">
        <a target="_blank" :href="`https://ropsten.etherscan.io/tx/${txHash}`">Etherscan</a>
    </button>
 </div>
</template>