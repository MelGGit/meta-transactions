<script setup lang="ts">

defineProps<{
    balanceInEth: string,
    address: string
}>()

</script>

<template>
    <div class="sm:rounded-xl sm:shadow-2xl p-2 sm:p-4 bg-white flex flex-col gap-3 sm:w-[30rem] w-screen border-b border-grey-500 sm:border-none">
        <h2 class="font-bold text-lg">Relayer</h2>
        <div class="flex gap-1 flex-col text-sm sm:text-md">
            <span>Address: {{address}} </span>
            <span>Balance: {{balanceInEth.substring(0,10)}} ETH</span>
        </div>
    </div>
</template>