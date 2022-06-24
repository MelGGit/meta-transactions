<script setup lang="ts">

defineProps<{
    balanceInEth: string,
    address: string
}>()

</script>

<template>
    <div class="rounded-xl shadow-2xl p-4 bg-white flex flex-col gap-3 w-[30rem]">
        <h2 class="font-bold text-lg">Relayer</h2>
        <div class="flex gap-1 flex-col">
            <span>Address: {{address}} </span>
            <span>Balance: {{balanceInEth.substring(0,10)}} ETH</span>
        </div>
    </div>
</template>