// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract Forwarder {
   struct ForwardRequest {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint256 nonce;
        bytes data;
    }
    
    mapping(address => uint256) private _nonces;

    function getNonce(address from) public view returns (uint256) {
        return _nonces[from];
    }


    function executeDelegate(ForwardRequest calldata request) public payable returns(bool, bytes memory) {
        _nonces[request.from] = request.nonce + 1;
        (bool success, bytes memory returndata) = request.to.call{gas: request.gas, value: request.value}(
            abi.encodePacked(request.data, request.from)
        );

        return (success, returndata);
    }
}