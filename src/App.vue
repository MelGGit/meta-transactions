<script setup lang="ts">
import MessageInput from './components/MessageInput.vue';
import MessageList from './components/MessageList.vue';
import Header from './components/Header.vue';
</script>

<template>
 <div class="flex flex-col gap-12 justify-center items-center pt-10">
   <Header />
   <MessageInput />
   <MessageList />
 </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
   background: linear-gradient(
    to bottom,
    #1d2230 0%,
    #1d2230 50%,
    white 50%,
    white 100%
  );
}
</style>
