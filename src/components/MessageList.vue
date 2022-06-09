<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Message, NewMessageEvent } from '../../typechain-types/Message'
import { ethers } from 'ethers';
import { Message as messageAddress } from '../deploy.json'
import messageAbi from '../abi/Message.json'

const messagesArray = ref<NewMessageEvent[]>([])


onMounted( async() => {
    try {
        const { ethereum } = window
        const provider = new ethers.providers.Web3Provider(ethereum)
        const messagContract = new ethers.Contract(messageAddress, messageAbi, provider) as Message
        messagContract.on(messagContract.filters.NewMessage(), (...args) => {
            const newEvent = args[args.length - 1] as NewMessageEvent
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