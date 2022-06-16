<script setup lang="ts">
import { ref } from 'vue'
import { sendMessage } from '../web3/sendMetaTx';

const isSending = ref(false)
const message = ref('')

const sendTransaction = async() => {
    isSending.value = true
    try {
        const response = await sendMessage(message.value)
        isSending.value = false
    } catch (error) {
        console.log(error)
        isSending.value = false
    }
}

</script>   

<template>
 <div>
     <form @submit.prevent="sendTransaction" class="flex gap-8 rounded-xl shadow-lg p-4">
        <input type="text" v-model="message" class="border-gray-400 border rounded-xl px-4" />
        <button class="bg-green-600 rounded-xl w-36 px-4 py-2 hover:bg-green-700" type="submit" :disabled="isSending">{{isSending? 'Sending...' : 'Send Message'}}</button>
     </form>
 </div>
</template>