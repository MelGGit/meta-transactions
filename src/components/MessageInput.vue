<script setup lang="ts">
import { TransactionResponse } from '@ethersproject/providers';
import { computed, mergeProps, ref } from 'vue'
import { sendMessage } from '../web3/sendMetaTx';

const props = defineProps<{
    isSending: boolean
    message: string
    txHash: string
}>()

const emits = defineEmits<{
    (event: 'send-transaction'):void
    (event: 'update:message', message: string):void
}>()

const messageComputed = computed({
    get: () => props.message,
    set: (message: string) => emits('update:message', message)
})

const sendTransaction = () => {
    emits('send-transaction')
}

</script>   

<template>
 <div class="rounded-xl shadow-lg p-4 bg-white flex gap-2 flex-col">
     <form @submit.prevent="sendTransaction" class="flex gap-8">
        <input type="text" v-model="messageComputed" class="border-gray-400 border rounded-xl px-4" />
        <button class="bg-green-600 rounded-xl w-36 px-4 py-2 hover:bg-green-700 hover:disabled:bg-green-600  disabled:opacity-80" type="submit" :disabled="isSending || message.length < 1">{{isSending? 'Sending...' : 'Send Message'}}</button>
     </form>
     <button class="bg-[#1d2230] text-white rounded-xl w-36 px-4 py-2 disabled:opacity-30" :disabled="txHash.length < 1">
        <a target="_blank" :href="`https://ropsten.etherscan.io/tx/${txHash}`">Etherscan</a>
    </button>
 </div>
</template>