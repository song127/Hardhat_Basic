// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import Create2 from OpenZeppelin
import "@openzeppelin/contracts/utils/Create2.sol";

contract DeployHelper {
    address public deployedContract;
    constructor() {}

    function deployClaimToReturn(
        bytes32 _infoHash,
        bytes32 _secretHash,
        address _parentContract,
        bytes calldata _creationBytecode
    ) external payable returns (address) {
        bytes memory bytecode = abi.encodePacked(
            _creationBytecode,
            abi.encode(_infoHash, _secretHash, _parentContract)
        );

        address addr = Create2.deploy(0, _secretHash, bytecode);

        deployedContract = addr;

        // transfer value to the deployed contract
        payable(addr).transfer(msg.value);

        return addr;
    }
}
