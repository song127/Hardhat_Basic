// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Create2.sol";
import "./Lock.sol";
import "./ClaimToReturn.sol";

contract Create2Test {
    function predictAddress(
        bytes32 _infoHash,
        bytes32 _saltHash,
        address _deployer
    ) external view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(ClaimToReturn).creationCode,
            abi.encode(_infoHash, _saltHash, address(this))
        );

        return
            Create2.computeAddress(
                _saltHash,
                keccak256(bytecode),
                _deployer
            );
    }
}
