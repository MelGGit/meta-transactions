<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Recipient, MessagePersistedEvent } from '../../typechain-types/Recipient'
import { ethers } from 'ethers';
import { Recipient as recipientAddress } from '../deploy.json'
import recipientAbi from '../abi/Recipient.json'

const messagesArray = ref<MessagePersistedEvent[]>([])


onMounted( async() => {
    try {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const messagContract = new ethers.Contract(recipientAddress, recipientAbi, provider) as Recipient
        messagContract.on(messagContract.filters.MessagePersisted(), (...args) => {
            const newEvent = args[args.length - 1] as MessagePersistedEvent
            messagesArray.value.unshift(newEvent)
        })
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div>
        Messages
        <ul class="mt-4">
            <div class="flex gap-20" v-for="userMessage in messagesArray" :key="userMessage.transactionHash">
                <span class="text-left">
                    {{ userMessage.args.from }}
                </span>
                <div class="">
                    <span>{{ userMessage.args.message }}</span>
                </div>
            </div>
        </ul>
    </div>
</template>