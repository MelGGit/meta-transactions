## Sequence Diagram

This is how the user interacts with the various components of this application.

The different components have been chosen with specific needs in mind:
* Backend: The backend is needed to protect the private key of the wallet that is doing the actual signing of the transactions on the blockchain.
* Forwarder: Ensures that the incoming transaction gets validated before actually sent for execution. The forwarder also keeps a record of the internal nonces that external wallets are using while forwarding.
* Recipient: This is the final smart contract whose method is originally called from the Frontend. It substitutes the forwarder sender for the actual sender (from) of the original transaction and persists the data on-chain.

```mermaid
  sequenceDiagram
    participant Frontend
    participant Metamask
    participant User
    participant Backend
    participant Forwarder
    participant Recipient

    rect rgb(111, 160, 200, 0.8)
        Frontend-->>Recipient: Subscribe to Interaction Events
    end

    activate Metamask
    rect rgb(208, 24, 192)
      Frontend->>Metamask: Request Accounts
      Metamask->>User: Ask to select wallet <br /> and connect
      User->>Metamask: selects wallet
      Frontend->>Metamask: Connect to selected wallet
    end
    rect rgb(208, 24, 192)
      Frontend->>Metamask: Request to INTERACT
      Metamask->>User: Popup and request to sign a message <br /> (the message contains the final INTERACT step <br/> and the current nonce for the User)
      User->>Frontend: Signs message
    end
    deactivate Metamask
    activate Backend

    rect rgb(208, 160, 20, 0.9)
      Frontend->>Backend: Send signed message and sender
      Backend->>Backend: Validate that the User (original signer)<br /> has actually signed the message
      Backend->>Backend: Sign actual transaction to INTERACT <br /> (Use local wallet for Gas)
    end
    Backend->>Forwarder: Call executeDelegate on Forwarder <br /> passing the tx
    deactivate Backend
    Forwarder->>Forwarder: Validate that signature <br/> has not been tampered with 
    Forwarder->>Forwarder: Validate the nonce <br/> for the sender
    Forwarder->>Forwarder: increase the nonce <br/> for the sender  
    Forwarder->>Recipient: INTERACT <br/> with the target  
    rect rgb(111, 160, 200, 0.8)
        Recipient->>Recipient: Persist the message under the original sender
        Recipient-->>Recipient: EMIT Interaction Event  
    end
    Recipient->>Forwarder: Deliver response  
    Forwarder->>Backend: Forward response  



```