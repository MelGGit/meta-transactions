import hre  from 'hardhat'
import { writeFileSync } from 'fs'

async function main() {
    const Message = await hre.ethers.getContractFactory("Message")
    const message = await Message.deploy()
    await message.deployed()

    writeFileSync('deploy.json', JSON.stringify({
        Message: message.address
    }))

    console.log(`Message: ${message.address}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });