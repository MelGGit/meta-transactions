## Sequence Diagram

This is how the user interacts with the various components of this application.


The different components have been chosen with specific needs in mind:
* Frontend: This component dispalys the UI to the user and interacts with the backend.
* Backend: Has three main functionalities. First it stores the api access key to communicate with the node. The second one is preparing the message the user has to sign and thirdly storing the private key to act as an EOA for signing transactions and paying the gas fees on behalf of the customer.
* Forwarder: Ensures that the incoming transaction gets validated before actually sent for execution. The forwarder also keeps a record of the internal nonces that external wallets are using while forwarding.
* Recipient: This is the final smart contract whose method is originally called from the Frontend. It substitutes the forwarder sender for the actual sender (from) of the original transaction and persists the data on-chain.
* Node: This component is an Infura node and runs its own copy of the chain which the dApp can query from.

```mermaid
    sequenceDiagram
        autonumber
        participant User
        participant Metamask
        participant Frontend
        participant Backend
        participant Forwarder
        participant Recipient
        participant Node

        rect rgb(111, 160, 200, 0.2)
        note right of User: App startup
        rect rgb(111, 160, 200, 0.4)
        note right of User: Relayer information
        Frontend->>Backend: Request for information about the relayer
        Backend->>Node: Forward Request
        Node->>Backend: Send information
        Backend->>Frontend: Forward information
        Frontend->>User: Display information
        end

        rect rgb(111, 160, 200, 0.4)
        note right of User: All messages
        Frontend->>Backend: Request for all messages
        Backend->>Node: Forward Request
        Node->>Backend: Send information
        Backend->>Frontend: Forward information
        Frontend->>User: Display all messages
        end
        end

        note right of User: User sends message

        rect rgb(111, 160, 200, 0.2)
        note right of User: Send message to SC
        rect rgb(111, 160, 200, 0.4)
        note right of User: Metamask connection
        Frontend->>Metamask: Ask for connection
        Metamask->>User: Ask for permission
        break if permission is denied
            Frontend->>User: show failure
        end
        Metamask->>Frontend: Send connected address
        end
        rect rgb(111, 160, 200, 0.4)
        note right of User: Network check
        Frontend->>Metamask: Ask for Users current network
        Metamask->>Frontend: Send network
        Frontend->>Frontend: Validates if network is Ropsten
        Frontend->>Metamask: if not Ropsten ask for network change
        Metamask->>User: Ask for permission
        break if permission is denied
            Frontend->>User: show failure
        end
        end
        rect rgb(111, 160, 200, 0.4)
        note right of User: Prepare Message to sign
        Frontend->>Backend: Request data to sign
        Backend->>Frontend: Send data to sign
        Frontend->>Metamask: Sign typed data
        Metamask->>User: Ask for permission
        break if permission is denied
            Frontend->>User: show failure
        end
        end
        rect rgb(111, 160, 200, 0.4)
        note right of User: Send to SC
        Frontend->>Backend: Send signature and request data
        Backend->>Backend: Validate signature
        break if signature is false
            Backend->>Frontend: send failure
            Frontend->>User: show failure
        end
        Backend->>Backend: Prepare signing of transaction
        Backend->>Forward: sign transaction for SC method executeDelegate on Forwarder
        end
        rect rgb(111, 160, 200, 0.4)
        note right of Forwarder: SC Interaction
        end
        end

```
