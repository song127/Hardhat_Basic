require("dotenv").config();

const hre = require("hardhat");

const fs = require("fs");

async function main() {
  console.log(
    "Deploy Start ======================================================"
  );
  const ethers = hre.ethers;

  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const gasPriceData = await ethers.provider.getGasPrice();
  console.log("Deployer :", deployer.address);
  console.log("Balance :", balance);
  console.log("Gas Price :", ethers.utils.formatUnits(gasPriceData, "gwei"));

  const contractNames = ["Name"];
  let results = [];

  const Contract = await ethers.getContractFactory(contractNames[0]);
  const contract = await Contract.deploy();
  // results.push(await contract.deployed());

  console.log(
    "Deploy Success ===================================================="
  );

  const deployedJson = {};
  contractNames.map((value, index) => {
    // deployedJson[value] = results[index].address;
  });

  fs.writeFileSync("deployed-address.json", JSON.stringify(deployedJson));

  const usedData = await deployer.getBalance();
  console.log("Gas Used:", ethers.utils.formatEther(`${balance - usedData}`));
  console.log("Balance :", usedData);
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
