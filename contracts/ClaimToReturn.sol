// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface AuctionInterface {
    function startTime() external view returns (uint256);
}

contract ClaimToReturn {
    bytes32 private immutable infoHash;
    bytes32 private immutable secretHash;
    uint256 private immutable deployTime;

    AuctionInterface private immutable parentContract;

    constructor(
        bytes32 _infoHash,
        bytes32 _secretHash,
        address _parentContract
    ) {
        infoHash = _infoHash;
        secretHash = _secretHash;
        deployTime = block.timestamp;
        parentContract = AuctionInterface(_parentContract);
    }

    function finalize() external returns (bytes32, bytes32, uint256) {
        require(
            address(parentContract) == msg.sender,
            "Only parent contract can call this function"
        );

        return (infoHash, secretHash, deployTime);
    }

    function finalizeCallback() public {
        require(
            block.timestamp >
                parentContract.startTime() + 90 * (1 days + 1 days) + 14 days,
            "Auction not yet ended"
        );

        payable(address(parentContract)).transfer(address(this).balance);

        selfdestruct(payable(msg.sender));
    }

    receive() external payable {}
}
