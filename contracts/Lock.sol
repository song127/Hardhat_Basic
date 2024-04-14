// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "hardhat/console.sol";

contract Lock {
    uint public deployTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        deployTime = block.timestamp;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        owner.transfer(address(this).balance);
    }

    function destroy() public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(owner);
    }

    function getDeployTime() public view returns (uint) {
        return deployTime;
    }

    function test1(uint256 num) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(num));
    }

    function test2(uint256 num) public pure returns (bytes32) {
        return keccak256(abi.encode(num));
    }

    function test3(uint256 num) public pure returns (bytes32) {
        return bytes32(abi.encodePacked(num));
    }

    function test4(uint256 num) public pure returns (bytes32) {
        return bytes32(abi.encode(num));
    }
}
