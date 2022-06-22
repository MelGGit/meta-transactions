# Sample Project for Meta-Transactions

If you want to look at the released application on Netlify and Ropsten, use the branch netlify.
If you want to test a local variant of this application, use the main branch and follow the instructions below.

## Steps to install

### Clone to local

```bash
$ git clone https://github.com/MelGGit/meta-transactions.git
$ cd meta-transactions
$ pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

### Start local blockchain

```bash
$ npx hardhat node
```
- a local development blockchain will run on http://127.0.0.1:8545/
- also you will get a list of all available accounts and their private keys
- !important! your local network needs to run the whole time. Else the App wont function.

### Add an account to Metamask
Only if you dont have an account already.
To interact with your local Blockchain you need an account.

#### Steps
- go to Metamask in the browser
- click the round circle in the top right
- click on import account
- copy one of the private keys (except Account#1 or Account#19 those are used inside the app) from the terminal and paste it into Metamask
- hit import

### Add Hardhat to your networks

The second step to interact with your local development blockchain is to add it to your list of networks.

#### Steps
- click the circle in the top right again
- click on settings
- click on Networks
- click on Add Network
- Add Network name: Hardhat local
- New RPC URL: http://127.0.0.1:8545/
- ChainId: 31337

Now Metamask can connect to your local Network.
Make sure, that you are on the Hardhat local network when using the app.

### Deploy the smart contract to your local network
Open another terminal window and switch to the backend folder again.
Run the deploy sript with:
```bash
$  npx hardhat run --network localhost scripts/deploy.ts
```
Now the smart contract has been deployed.

### Run the Relayer
Open another terminal window to run the server(relayer)
```bash
$  node server.js
```

### Run the app

Open another terminal window and type:

```bash
$ pnpm dev
```

Now your browser will open and you can use the App.

Haven fun!
