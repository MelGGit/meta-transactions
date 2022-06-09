<script setup lang="ts">
import MessageInput from './components/MessageInput.vue';
import MessageList from './components/MessageList.vue';
</script>

<template>
 <div class="flex flex-col gap-12 justify-center items-center">
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
  margin-top: 60px;
}
</style>
