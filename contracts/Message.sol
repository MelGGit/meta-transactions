// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Message {
  address private immutable _trustedForwarder;

  mapping(address => string) public addressToMessage;

  event NewMessage(address indexed from, string message);

  modifier onlyTrustedForwarder {
    require(msg.sender == _trustedForwarder);
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
    emit NewMessage(sender, message);
  }
}