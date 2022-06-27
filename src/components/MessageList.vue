<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Recipient, MessagePersistedEvent } from '../../typechain-types/Recipient'
import { ethers } from 'ethers';
import { Recipient as recipientAddress } from '../deploy.json'
import recipientAbi from '../abi/Recipient.json'
import { createProvider } from '../web3/provider';

defineProps<{
    messagesArray:MessagePersistedEvent[]
}>()

const createShortAddress = (address: string): string => {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4)
}

</script>

<template>
    <div class="sm:rounded-xl sm:shadow-2xl p-2 sm:p-4 flex sm:w-1/2 flex-col w-screen gap-4 bg-white sm:h-96 overflow-y-scroll">
        <div class="flex font-bold text-lg sm:justify-evenly w-full items-center">
            <span class="w-full sm:text-center">Address</span>
            <span class="w-full text-center">Message</span>
        </div>
        <div v-if="messagesArray.length < 1" class="flex justify-evenly sm:items-center">
            <span class="w-full sm:text-center">{{ createShortAddress('0x12349900ABCD') }}</span>
            <span class="w-full sm:text-center">Write the first message!</span>
        </div>
        <ul class="w-full flex flex-col gap-2" v-if="messagesArray.length > 0">
            <div class="flex w-full sm:justify-evenly sm:items-center" v-for="userMessage in messagesArray" :key="userMessage.transactionHash">
                <span class="w-full sm:text-center">
                    {{ createShortAddress(userMessage.args[0]) }}
                </span>
                <div class="w-full text-center overflow-ellipsis">
                    <span>{{ userMessage.args[1] }}</span>
                </div>
            </div>
        </ul>
    </div>
</template>