// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Recipient {
  address private immutable _trustedForwarder;

  mapping(address => string) public addressToMessage;

  event MessagePersisted(address indexed from, string message);

  modifier onlyTrustedForwarder {
    require(msg.sender == _trustedForwarder, "only the trusted forwarder can call this function");
    _;
  }

  constructor(address trustedForwarder) {
    _trustedForwarder = trustedForwarder;
  }

  function addNewMessage(string memory message) public onlyTrustedForwarder  {
    address sender;
    assembly {
                sender := shr(96, calldataload(sub(calldatasize(), 20)))
            }
    addressToMessage[sender] = message;
    emit MessagePersisted(sender, message);
  }
}