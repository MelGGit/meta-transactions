<script setup lang="ts">
import MessageInput from './components/MessageInput.vue';
import MessageList from './components/MessageList.vue';
import Header from './components/Header.vue';
import { MessagePersistedEvent } from '../typechain-types/Recipient';
import { onMounted, ref } from 'vue';
import { sendMessage } from './web3/sendMetaTx';
import { ethers } from 'ethers';
import RelayerInformation from './components/RelayerInformation.vue';

const messagesArray = ref<MessagePersistedEvent[]>([])
const isSending = ref(false)
const message = ref('')
const txHash = ref('')
const relayerBalanceInEth = ref('')
const relayerAddress = ref('')

const checkIfIsCorrectNetwork = async() => {
  if(window.ethereum) {
    const { ethereum } = window
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log(chainId)
    return chainId === '0x3'
  } else {
      // if no window.ethereum then MetaMask is not installed
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    } 
}

const requestChangeNetwork = async() => {
  if (window.ethereum) {
      const { ethereum } = window
      try {
        // check if the chain to connect to is installed
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x3' }], // chainId must be in hexadecimal numbers
        });
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x3',
                  rpcUrls: ['https://ropsten.infura.io/v3/'],
                  chainName: "Ropsten Test Network",
                    nativeCurrency: {
                      name: "ETH",
                      symbol: "ETH", // 2-6 characters long
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://ropsten.etherscan.io/"]
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    } 
}

const sendTransaction = async() => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://astounding-daifuku-0318c0.netlify.app/': 'http://localhost:8888/'
    const isCorrectNetwork = await checkIfIsCorrectNetwork()
    console.log(isCorrectNetwork)
    if(!isCorrectNetwork) {
      await requestChangeNetwork()
    }
    isSending.value = true
    try {
        const { contractTx } = await sendMessage(message.value)
        txHash.value = contractTx.hash
        let transaction
        const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
        while(!transaction || transaction.confirmations === 0) {
            const transactionRequest = await fetch(`${apiUrl}.netlify/functions/getTransactionReceipt`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({txHash: contractTx.hash})
            })
            transaction = await transactionRequest.json()
            console.log(transaction.confirmations)
            await sleep(20000)
        }
        message.value = ''
        isSending.value = false
        getAllMessages()
    } catch (error) {
        console.log(error)
        isSending.value = false
    }
}

const getRelayerInformation = async() => {
    const apiUrl = process.env.NODE_ENV === 'production' ? 'https://astounding-daifuku-0318c0.netlify.app/': 'http://localhost:8888/'
    try {
      const relayerInformationRequest = await fetch(`${apiUrl}.netlify/functions/getRelayerInformation`, {
             method: 'GET',
             headers: {
             'Content-Type': 'application/json'
                },
            })
      const { balance , address } = await relayerInformationRequest.json()
      const balanceInEth = ethers.utils.formatEther(balance)
      relayerBalanceInEth.value = balanceInEth
      relayerAddress.value = address
    } catch (error) {
      console.log(error)
    }
}

const getAllMessages = async() => {
    try {
        const apiUrl = process.env.NODE_ENV === 'production' ? 'https://astounding-daifuku-0318c0.netlify.app/': 'http://localhost:8888/'
            const allMessagesRequest = await fetch(`${apiUrl}.netlify/functions/getAllMessages`, {
             method: 'GET',
             headers: {
             'Content-Type': 'application/json'
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
        getRelayerInformation()
        getAllMessages()
    } catch (error) {
        console.log(error)
    }
})

</script>

<template>
 <div class="flex flex-col gap-12 justify-center items-center pt-10">
   <Header />
   <MessageInput v-model:message="message" :is-sending="isSending" :tx-hash="txHash" @send-transaction="sendTransaction()" />
   <RelayerInformation :balance-in-eth="relayerBalanceInEth" :address="relayerAddress" />
   <MessageList :messages-array="messagesArray" />
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
