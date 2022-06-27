<script setup lang="ts">
import GithubLogo from '../assets/GithubLogo.vue';

</script>

<template>
    <header class="w-full flex flex-col justify-center items-center gap-2 text-white">
       <h2 class="text-4xl">Send your Message</h2>
       <div class="flex gap-4">
           <span>gasless using meta-transactions</span>
           <a href="https://github.com/MelGGit/meta-transactions" target="_blank">
               <GithubLogo class="fill-white" />
           </a>
       </div>
    </header>
</template>