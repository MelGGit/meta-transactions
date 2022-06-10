import hre  from 'hardhat'
import { writeFileSync } from 'fs'

async function main() {

  // Deploy forwarder first to get the address for Recipient Contract constructor
    const Forwarder = await hre.ethers.getContractFactory('Forwarder')
    const forwarder = await Forwarder.deploy()
    await forwarder.deployed()

    const Recipient = await hre.ethers.getContractFactory("Recipient")
    const recipient = await Recipient.deploy(forwarder.address)
    await recipient.deployed()

    writeFileSync('./src/deploy.json', JSON.stringify({
        Recipient: recipient.address,
        Forwarder: forwarder.address
    }))

    console.log(`Recipient: ${recipient.address}`, `Forwarder: ${forwarder.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });