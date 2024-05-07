// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import Create2 from OpenZeppelin
import "@openzeppelin/contracts/utils/Create2.sol";

interface ClaimToReturnInterface {
    function deposit() external payable;
}

contract DeployHelper {
    constructor() {}

    function deployClaimToReturn(
        bytes32 _infoHash,
        bytes32 _secretHash,
        address _auctionContract,
        bytes calldata _creationBytecode
    ) external payable {
        bytes memory bytecode = abi.encodePacked(
            _creationBytecode,
            abi.encode(_infoHash, _secretHash, _auctionContract, address(this))
        );

        address addr = Create2.deploy(0, _secretHash, bytecode);

        ClaimToReturnInterface(addr).deposit{value: msg.value}();

        selfdestruct(payable(msg.sender));
    }
}
