// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface AuctionInterface {
    function startTime() external view returns (uint256);
}

contract ClaimToReturn {
    bytes32 private immutable infoHash;
    bytes32 private immutable secretHash;
    uint256 private immutable deployTime;
    uint256 private amount;

    AuctionInterface private immutable auctionContract;
    address public immutable helperContract;

    constructor(
        bytes32 _infoHash,
        bytes32 _secretHash,
        address _auctionContract,
        address _helperContract
    ) {
        infoHash = _infoHash;
        secretHash = _secretHash;
        deployTime = block.timestamp;
        auctionContract = AuctionInterface(_auctionContract);
        helperContract = _helperContract;
    }

    function deposit() external payable {
        require(amount == 0, "Already deposited");

        amount = msg.value;
    }

    function getFinalizeDataSets() external view returns (bytes32, bytes32, uint256, uint256) {
        require(
            address(auctionContract) == msg.sender,
            "Only parent contract can call this function"
        );

        return (infoHash, secretHash, deployTime, amount);
    }

    function finalizeCallback() external {
        require(
            address(auctionContract) == msg.sender,
            "Only parent contract can call this function"
        );

        payable(address(auctionContract)).transfer(address(this).balance);

        selfdestruct(payable(address(auctionContract)));
    }

    receive() external payable {}
}
