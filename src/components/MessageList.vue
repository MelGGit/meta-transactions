<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Recipient, MessagePersistedEvent } from '../../typechain-types/Recipient'
import { ethers } from 'ethers';
import { Recipient as recipientAddress } from '../deploy.json'
import recipientAbi from '../abi/Recipient.json'
import { createProvider } from '../web3/provider';

const messagesArray = ref<MessagePersistedEvent[]>([])

const createShortAddress = (address: string): string => {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

onMounted( async() => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production' ? 'https://astounding-daifuku-0318c0.netlify.app/': 'http://localhost:8888/'
        const allMessagesRequest = await fetch(`${apiUrl}.netlify/functions/getAllMessages`, {
         method: 'GET',
         headers: {
         'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        })
        const allMessages = await allMessagesRequest.json()

        messagesArray.value = allMessages
        // const provider = new ethers.providers.Web3Provider(window.ethereum)
        // const recipientContract = new ethers.Contract(recipientAddress, recipientAbi, provider) as Recipient
        // pastMessages.forEach((message) => messagesArray.value.unshift(message))
        // recipientContract.on('MessagePersisted', (...args:any[]) => {
        //     const newEvent = args[args.length - 1] as MessagePersistedEvent

        //     if(messagesArray.value.filter(value => value.transactionHash === newEvent.transactionHash).length < 1) {
        //         messagesArray.value.unshift(newEvent)
        //     }
        // })
    } catch (error) {
        console.log(error)
    }
})
</script>

<template>
    <div class="rounded-xl shadow-2xl p-4 flex w-1/2 flex-col gap-4 bg-white">
        <div class="flex font-bold text-lg justify-evenly w-full items-center">
            <span class="w-full text-center">Address</span>
            <span class="w-full text-center">Message</span>
        </div>
        <div v-if="messagesArray.length < 1" class="flex justify-evenly items-center">
            <span class="w-full text-center">{{ createShortAddress('0x12349900ABCD') }}</span>
            <span class="w-full text-center">Write the first message!</span>
        </div>
        <ul class="w-full flex flex-col gap-2" v-if="messagesArray.length > 0">
            <div class="flex w-full justify-evenly items-center" v-for="userMessage in messagesArray" :key="userMessage.transactionHash">
                <span class="w-full text-center">
                    {{ createShortAddress(userMessage.args.from) }}
                </span>
                <div class="w-full text-center overflow-ellipsis">
                    <span>{{ userMessage.args.message }}</span>
                </div>
            </div>
        </ul>
    </div>
</template>