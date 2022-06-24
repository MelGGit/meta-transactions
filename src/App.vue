<script setup lang="ts">
import MessageInput from './components/MessageInput.vue';
import MessageList from './components/MessageList.vue';
import Header from './components/Header.vue';
import { MessagePersistedEvent } from '../typechain-types/Recipient';
import { onMounted, ref } from 'vue';

const messagesArray = ref<MessagePersistedEvent[]>([])

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
   <MessageInput />
   <MessageList :messagesArray="messagesArray" />
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
