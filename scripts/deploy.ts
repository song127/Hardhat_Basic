import { BaseContract } from "ethers";

require("dotenv").config();

const hre = require("hardhat");

const fs = require("fs");

async function main() {
  console.log(
    "Deploy Start ======================================================"
  );
  const ethers = hre.ethers;

  const [deployer] = await ethers.getSigners();

  console.log("Deployer :", deployer.address);

  const contractNames = ["DeployHelper"];

  const Contract = await ethers.getContractFactory(contractNames[0]);
  const contract = await Contract.deploy();
  const deployResult: BaseContract = await contract.waitForDeployment();

  console.log(
    "Deploy Success ===================================================="
  );

  // fs.writeFileSync("deployed-address.json", JSON.stringify(contract.address));

  console.log("Contract Address :", await deployResult.getAddress());

  console.log(
    "Deploy Over ======================================================="
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
