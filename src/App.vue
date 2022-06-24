<script setup lang="ts">
import MessageInput from './components/MessageInput.vue';
import MessageList from './components/MessageList.vue';
import Header from './components/Header.vue';
import { MessagePersistedEvent } from '../typechain-types/Recipient';
import { onMounted, ref } from 'vue';
import { sendMessage } from './web3/sendMetaTx';

const messagesArray = ref<MessagePersistedEvent[]>([])
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
            console.log(transaction.confirmations)
            await sleep(25000)
        }
        message.value = ''
        isSending.value = false
        getAllMessages()
    } catch (error) {
        console.log(error)
        isSending.value = false
    }
}

const getAllMessages = async() => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production' ? 'https://astounding-daifuku-0318c0.netlify.app/': 'http://localhost:8888/'
            const allMessagesRequest = await fetch(`${apiUrl}.netlify/functions/getAllMessages`, {
             method: 'GET',
             headers: {
             'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            const allMessages = await allMessagesRequest.json() as MessagePersistedEvent[]
            messagesArray.value = allMessages
    } catch (error) {
        console.log(error)
    }
}

onMounted( async() => {
    try {
        await getAllMessages()
    } catch (error) {
        console.log(error)
    }
})

</script>

<template>
 <div class="flex flex-col gap-12 justify-center items-center pt-10">
   <Header />
   <MessageInput v-model:message="message" :is-sending="isSending" :tx-hash="txHash" @send-transaction="sendTransaction()" />
   <MessageList :messages-array="messagesArray" />
 </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
   background: linear-gradient(
    to bottom,
    #1d2230 0%,
    #1d2230 20%,
    white 20%,
    white 100%
  );
}
</style>
