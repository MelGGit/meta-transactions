import hre  from 'hardhat'
import { writeFileSync } from 'fs'

async function main() {

  // Deploy forwarder first to get the address for Message Contract constructor
    const Forwarder = await hre.ethers.getContractFactory('Forwarder')
    const forwarder = await Forwarder.deploy()
    await forwarder.deployed()

    const Message = await hre.ethers.getContractFactory("Message")
    const message = await Message.deploy(forwarder.address)
    await message.deployed()

    writeFileSync('./src/deploy.json', JSON.stringify({
        Message: message.address,
        Forwarder: forwarder.address
    }))

    console.log(`Message: ${message.address}`, `Forwarder: ${forwarder.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });