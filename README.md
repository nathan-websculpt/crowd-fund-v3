# 🚀 🌑 Multisig Crowd Funds on The Graph

#### Follow-Along Blogs

- [Building a Project with SE-2 | Crowd Fund | Part Six | The Subgraph](https://medium.com/@websculpt/building-a-project-with-se-2-crowd-fund-part-six-the-subgraph-942fb9f1c667)
- [Building a Project with SE-2 | Crowd Fund | Part Seven | The Components](https://medium.com/@websculpt/building-a-project-with-se-2-crowd-fund-part-seven-the-components-2fa4dc6853ce)
- [Local Graph Dev with Scaffold-ETH 2](https://medium.com/@websculpt/local-graph-dev-with-scaffold-eth-2-a774a67b148c)
- [Query Local Graph with Scaffold-ETH 2](https://medium.com/@websculpt/query-local-graph-with-scaffold-eth-2-0686a27405b8)
- [Deploying a Subgraph](https://medium.com/@websculpt/deploying-a-subgraph-8771f25d0d0f)

## Branches

### Deployed Subgraph

The Main branch will allow you to tinker with a local frontend that points to a deployed subgraph (already populated with data).

```
git clone https://github.com/nathan-websculpt/crowd-fund-v3.git
cd crowd-fund-v3
yarn install
```

Then, simply start the app:

```
yarn start
```

### Local Subgraph

The [_0_local_graph](https://github.com/nathan-websculpt/crowd-fund-v3/tree/_0_local_graph) branch will allow you to start fresh with a [local subgraph](https://github.com/nathan-websculpt/crowd-fund-v3/tree/_0_local_graph/packages/subgraph#readme).

```
git clone -b _0_local_graph https://github.com/nathan-websculpt/crowd-fund-v3.git YourProjectName
cd YourProjectName
yarn install
```

Click to see [Local Graph Dev Quickstart](#Local-Graph-Dev-Quickstart) details.

### 📌 Overview
- [Current Contract](https://sepolia.etherscan.io/address/0xbF7766D1488Fe89337174847D533052fc17B475b)
  - 0xbF7766D1488Fe89337174847D533052fc17B475b
- [Current Site](https://crowd-fund-v3-nextjs.vercel.app/)
- [View a Vault](https://crowd-fund-v3-nextjs.vercel.app/crowdfund/vaults/10)
- [View Query Data](https://crowd-fund-v3-nextjs.vercel.app/queries)
- 😁 What's New? 😁
  - [V2](https://github.com/nathan-websculpt/crowd-fund-v2) and V3 (this one) will represent two extremes
  - [V2](https://github.com/nathan-websculpt/crowd-fund-v2) stores everything on the contract
  - V3 will store as little as possible on the contract (will now be using a subgraph)

⚙️ Built with [Scaffold-ETH 2](#-scaffold-eth-2), using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.


## ✅  Demo 📱
https://github.com/nathan-websculpt/crowd-fund-v3/assets/58645278/a2969b7f-65bd-4757-bd5d-3be426946afc

## 🧶 Yarn Tests
 - 🗝️ 🔒 Single-Owner Tests
 ```
 yarn test ./test/CrowdFundTest.ts
 ```
 - 🗝️🗝️🗝️ 🔒 Multisig Tests
 ```
 yarn test ./test/MultisigTest.ts
 ```
 Note that you can also test against the Contract that is deployed to Sepolia by changing the default/target network **FROM** *localhost/hardhat* **TO** *sepolia* in the following (2) files: 
 - \packages\hardhat\hardhat.config.ts
 - \packages\nextjs\scaffold.config.ts

Or you can use the [subgraph directory](https://github.com/nathan-websculpt/crowd-fund-v3/tree/main/packages/subgraph/src) as an example that you can use when making your own subgraph in the [Subgraph Studio](https://thegraph.com/studio/)

## 🙂 Overview

### 🔗 *CrowdFund.sol* and the *subgraph*

#### 🚧🚧🚧There are major changes to the contract from [V2](https://github.com/nathan-websculpt/crowd-fund-v2/blob/main/packages/hardhat/contracts/CrowdFund.sol)🚧🚧🚧

- V2 **structs** replaced by events
  - which are mapped to Entities that we query from a subgraph later
  - one-to-many relationships
    - Fund Runs _> Proposals
    - Proposals _> Signers/Signatures
  - [schema.graphql](https://github.com/nathan-websculpt/crowd-fund-v3/blob/main/packages/subgraph/src/schema.graphql)
  - [mapping.ts](https://github.com/nathan-websculpt/crowd-fund-v3/blob/main/packages/subgraph/src/mapping.ts)
  - [view queries (code)](https://github.com/nathan-websculpt/crowd-fund-v3/blob/main/packages/nextjs/helpers/getQueries.ts)
  - [view queries (live)](https://crowd-fund-v3-nextjs.vercel.app/queries)

### 📜 *The 'rules-of-use' for Single-Wallet "Fund Runs":*

- Crowd Fund is a way for users to create **“Fund Runs”** that other users can donate to.
- These Fund Runs have deadlines ⌛
  - defined in *minutes* by the user during Fund Run creation
- Fund Runs also have a *target money goal* 
- A donor can get their funds back from a Fund Run **IF**:
  - The deadline ⌛ has passed
  - The fund failed to raise its target capital
- An owner can get their new donations **IF**:
  - The deadline ⌛ has passed
  - The fund’s donations are greater-than/equal-to the *target money goal*

###  📜 *How Multisig "Fund Runs" are different:*
- The mindset of a multisig vault is that payments made (from it) are more granular 
- If a user wants to get all of their funds at once, a Single-Wallet "Fund Run" is a better choice
- A Multisig Fund Run is good for users who want to show their donors a set of record-logs for payments coming out of their vault
  - Examples: 💸💸💸
    - "We want to **pay *0x0123*** 0.4 Ether for *'Web Design Services'*" 
    - "We want to **pay *0x0456*** 0.1 Ether for *'Telegram Mod Services'*"
    - "We want to **pay *0x0789*** 0.7 Ether for *'Coding like the wind'*"
- A Multisig Vault is intended to be safer, since it takes multiple approvals for any funds to transfer
- These Vaults offer donors a granular view of where their funds ended up

## 🧐 Before You Start

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://docs.docker.com/get-docker/)

## Local Graph Dev Quickstart

To get started with Crowd Fund, follow the steps below ([To get started with SE-2 instead, click here](#-scaffold-eth-2)):

1. Clone this repo & install dependencies

```
git clone -b _0_local_graph https://github.com/nathan-websculpt/crowd-fund-v3.git YourProjectName
cd YourProjectName
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the contract:

```
yarn deploy
```

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

- Edit your smart contract `CrowdFund.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

5. On a fourth terminal, spin up a local graph node ([more details about local graph dev here](https://github.com/nathan-websculpt/crowd-fund-v3/blob/_0_local_graph/packages/subgraph/README.md)) (*you will need Docker installed*):

```
yarn run-node
```

6. In another terminal, create the local subgraph (you only need to do this once):

```
yarn local-create
```

7. Ship the local subgraph:

```
yarn local-ship
```

## 📝 Testing CrowdFund.sol
Test script: *`packages/hardhat/test/CrowdFundTest.ts`*
 ```
 yarn test ./test/CrowdFundTest.ts
 ```
The test script will act on behalf of 3 test users: Alice, Bob, and John.

**Alice, Bob, and John will all three make Fund Runs...**

Then the users will donate to one another, such that:
- Alice's Fund is successful
- John's Fund doesn't collect quite enough
- Bob's Fund is a total failure

The test then ensures that:
- Alice can do an 'Owner Withdrawal'
- Alice and Bob both can do a 'Donor Withdrawal' from John's Fund
- Bob's Fund is empty

##### 🗝️🗝️🗝️ 🔒  For Multisig Tests: 
 ```
 yarn test ./test/MultisigTest.ts
 ```
<br />
<br />


###### [ *Crowd Fund is built using Scaffold-ETH 2* ]
# 🏗 Scaffold-ETH 2

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

## Contents

- [Requirements](#requirements)
- [Quickstart](#quickstart)
- [Deploying your Smart Contracts to a Live Network](#deploying-your-smart-contracts-to-a-live-network)
- [Deploying your NextJS App](#deploying-your-nextjs-app)
- [Interacting with your Smart Contracts: SE-2 Custom Hooks](#interacting-with-your-smart-contracts-se-2-custom-hooks)
- [Disabling Type & Linting Error Checks](#disabling-type-and-linting-error-checks)
  - [Disabling commit checks](#disabling-commit-checks)
  - [Deploying to Vercel without any checks](#deploying-to-vercel-without-any-checks)
  - [Disabling Github Workflow](#disabling-github-workflow)
- [Contributing to Scaffold-ETH 2](#contributing-to-scaffold-eth-2)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Deploying your Smart Contracts to a Live Network

Once you are ready to deploy your smart contracts, there are a few things you need to adjust.

1. Select the network

By default, `yarn deploy` will deploy the contract to the local network. You can change the defaultNetwork in `packages/hardhat/hardhat.config.ts.` You could also simply run `yarn deploy --network target_network` to deploy to another network.

Check the `hardhat.config.ts` for the networks that are pre-configured. You can also add other network settings to the `hardhat.config.ts file`. Here are the [Alchemy docs](https://docs.alchemy.com/docs/how-to-add-alchemy-rpc-endpoints-to-metamask) for information on specific networks.

Example: To deploy the contract to the Sepolia network, run the command below:

```
yarn deploy --network sepolia
```

2. Generate a new account or add one to deploy the contract(s) from. Additionally you will need to add your Alchemy API key. Rename `.env.example` to `.env` and fill the required keys.

```
ALCHEMY_API_KEY="",
DEPLOYER_PRIVATE_KEY=""
```

The deployer account is the account that will deploy your contracts. Additionally, the deployer account will be used to execute any function calls that are part of your deployment script.

You can generate a random account / private key with `yarn generate` or add the private key of your crypto wallet. `yarn generate` will create a random account and add the DEPLOYER_PRIVATE_KEY to the .env file. You can check the generated account with `yarn account`.

3. Deploy your smart contract(s)

Run the command below to deploy the smart contract to the target network. Make sure to have some funds in your deployer account to pay for the transaction.

```
yarn deploy --network network_name
```

4. Verify your smart contract

You can verify your smart contract on Etherscan by running:

```
yarn verify --network network_name
```

## Deploying your NextJS App

**Hint**: We recommend connecting your GitHub repo to Vercel (through the Vercel UI) so it gets automatically deployed when pushing to `main`.

If you want to deploy directly from the CLI, run `yarn vercel` and follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

**Make sure your `packages/nextjs/scaffold.config.ts` file has the values you need.**

## Interacting with your Smart Contracts: SE-2 Custom Hooks

Scaffold-ETH 2 provides a collection of custom React hooks designed to simplify interactions with your deployed smart contracts. These hooks are wrappers around `wagmi`, automatically loading the necessary contract ABI and address. They offer an easy-to-use interface for reading from, writing to, and monitoring events emitted by your smart contracts.

To help developers get started with smart contract interaction using Scaffold-ETH 2, we've provided the following custom hooks:

- [useScaffoldContractRead](#usescaffoldcontractread): for reading public variables and getting data from read-only functions of your contract.
- [useScaffoldContractWrite](#usescaffoldcontractwrite): for sending transactions to your contract to write data or perform an action.
- [useScaffoldEventSubscriber](#usescaffoldeventsubscriber): for subscribing to your contract events and receiving real-time updates when events are emitted.
- [useScaffoldEventHistory](#usescaffoldeventhistory): for retrieving historical event logs for your contract, providing past activity data.
- [useDeployedContractInfo](#usedeployedcontractinfo): for fetching details from your contract, including the ABI and address.
- [useScaffoldContract](#usescaffoldcontract): for obtaining a contract instance that lets you interact with the methods of your deployed smart contract.

These hooks offer a simplified and streamlined interface for interacting with your smart contracts. If you need to interact with external contracts, you can use `wagmi` directly, or add external contract data to your `deployedContracts.ts` file.

### useScaffoldContractRead:

Use this hook to read public variables and get data from read-only functions of your smart contract.

```ts
const { data: totalCounter } = useScaffoldContractRead({
  contractName: "YourContract",
  functionName: "getGreeting",
  args: ["ARGUMENTS IF THE FUNCTION ACCEPTS ANY"],
});
```

This example retrieves the data returned by the `getGreeting` function of the `YourContract` smart contract. If the function accepts any arguments, they can be passed in the args array. The retrieved data is stored in the `data` property of the returned object.

### useScaffoldContractWrite:

Use this hook to send a transaction to your smart contract to write data or perform an action.

```ts
const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: ["The value to set"],
  // For payable functions, expressed in ETH
  value: "0.01",
  // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
  blockConfirmations: 1,
  // The callback function to execute when the transaction is confirmed.
  onBlockConfirmation: (txnReceipt) => {
    console.log("Transaction blockHash", txnReceipt.blockHash);
  },
});
```

To send the transaction, you can call the `writeAsync` function returned by the hook. Here's an example usage:

```ts
<button className="btn btn-primary" onClick={writeAsync}>
  Send TX
</button>
```

This example sends a transaction to the `YourContract` smart contract to call the `setGreeting` function with the arguments passed in `args`. The `writeAsync` function sends the transaction to the smart contract, and the `isLoading` and `isMining` properties indicate whether the transaction is currently being processed by the network.

### useScaffoldEventSubscriber:

Use this hook to subscribe to events emitted by your smart contract, and receive real-time updates when these events are emitted.

```ts
useScaffoldEventSubscriber({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // The listener function is called whenever a GreetingChange event is emitted by the contract.
  // It receives the parameters emitted by the event, for this example: GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  listener: (greetingSetter, newGreeting, premium, value) => {
    console.log(greetingSetter, newGreeting, premium, value);
  },
});
```

This example subscribes to the `GreetingChange` event emitted by the `YourContract` smart contract, and logs the parameters emitted by the event to the console whenever it is emitted. The `listener` function accepts the parameters emitted by the event, and can be customized according to your needs.

### useScaffoldEventHistory:

Use this hook to retrieve historical event logs for your smart contract, providing past activity data.

```ts
const {
  data: events,
  isLoading: isLoadingEvents,
  error: errorReadingEvents,
  } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // Specify the starting block number from which to read events, this is a bigint.
  fromBlock: 31231n,
  blockData: true,
  // Apply filters to the event based on parameter names and values { [parameterName]: value },
  filters: { premium: true }
  // If set to true it will return the transaction data for each event (default: false),
  transactionData: true,
  // If set to true it will return the receipt data for each event (default: false),
  receiptData: true
});
```

This example retrieves the historical event logs for the `GreetingChange` event of the `YourContract` smart contract, starting from block number 31231 and filtering events where the premium parameter is true. The data property of the returned object contains an array of event objects, each containing the event parameters and (optionally) the block, transaction, and receipt data. The `isLoading` property indicates whether the event logs are currently being fetched, and the `error` property contains any error that occurred during the fetching process (if applicable).

### useDeployedContractInfo:

Use this hook to fetch details about a deployed smart contract, including the ABI and address.

```ts
// ContractName: name of the deployed contract
const { data: deployedContractData } = useDeployedContractInfo(contractName);
```

This example retrieves the details of the deployed contract with the specified name and stores the details in the deployedContractData object.

### useScaffoldContract:

Use this hook to get your contract instance by providing the contract name. It enables you interact with your contract methods.
For reading data or sending transactions, it's recommended to use `useScaffoldContractRead` and `useScaffoldContractWrite`.

```ts
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
});
// Returns the greeting and can be called in any function, unlike useScaffoldContractRead
await yourContract?.greeting();

// Used to write to a contract and can be called in any function
import { useWalletClient } from "wagmi";

const { data: walletClient } = useWalletClient();
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
  walletClient,
});
const setGreeting = async () => {
  // Call the method in any function
  await yourContract?.setGreeting("the greeting here");
};
```

This example uses the `useScaffoldContract` hook to obtain a contract instance for the `YourContract` smart contract. The data property of the returned object contains the contract instance that can be used to call any of the smart contract methods.

## Disabling type and linting error checks

> **Hint**
> Typescript helps you catch errors at compile time, which can save time and improve code quality, but can be challenging for those who are new to the language or who are used to the more dynamic nature of JavaScript. Below are the steps to disable type & lint check at different levels

### Disabling commit checks

We run `pre-commit` [git hook](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) which lints the staged files and don't let you commit if there is an linting error.

To disable this, go to `.husky/pre-commit` file and comment out `yarn lint-staged --verbose`

```diff
- yarn lint-staged --verbose
+ # yarn lint-staged --verbose
```

### Deploying to Vercel without any checks

By default, Vercel runs types and lint checks before building your app. The deployment will fail if there are any types or lint errors.

To ignore these checks while deploying from the CLI, use:

```shell
yarn vercel:yolo
```

If your repo is connected to Vercel, you can set `NEXT_PUBLIC_IGNORE_BUILD_ERROR` to `true` in a [environment variable](https://vercel.com/docs/concepts/projects/environment-variables).

### Disabling Github Workflow

We have github workflow setup checkout `.github/workflows/lint.yaml` which runs types and lint error checks every time code is **pushed** to `main` branch or **pull request** is made to `main` branch

To disable it, **delete `.github` directory**

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
