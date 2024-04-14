import { BaseContract, ethers, getCreate2Address } from "ethers";
import * as dotenv from "dotenv";
import MainTestContractJson from "./src/artifacts/contracts/Create2Test.sol/Create2Test.json";
import HelperContractJson from "./src/artifacts/contracts/DeployHelper.sol/DeployHelper.json";
import ClaimContractJson from "./src/artifacts/contracts/ClaimToReturn.sol/ClaimToReturn.json";
import { changeBlock, makeHashedData, mineBlock } from "./utils";

dotenv.config();

const create2Address = "0x8a791620dd6260079bf849dc5567adc3f2fdc318";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const wallet = new ethers.Wallet(process.env.LOCAL_SECRET as string, provider);

const main = async () => {
  // S: Deploy helper test / Success
  // const mainAdd = await deployMainContract();
  const mainAdd = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
  const helperAdd = await deployDeployHelper();
  // const helperAdd = "0x7a2088a1bFc9d81c55368AE168C2C02570cB814F";
  await changeBlock();
  await predicateWithContract(mainAdd, helperAdd);
  await deployClaimReturnContractFromHelper(mainAdd, helperAdd);
  const deployedAddress = await getDeployedContractAddress(helperAdd);
  // await testGetDataFromCreate2DeployedContract(deployedAddress);

  // S: 배포자 기준 예측 함수가 맞는가? 검증 / 실패
  // predictedAddress();
  // await predicateWithContract();
  // await changeBlock();
  // predictedAddress();
  // await predicateWithContract();
  // await changeBlock();
  // await deployLockContract();
  // await deployLockContractFromCreate2();
};

const predicateWithContract = async (mainAdd: string, helperAdd: string) => {
  console.log("[Predicate with contract]");
  const { infoHash, secretHash } = makeHashedData();

  const contract = new ethers.Contract(
    mainAdd,
    MainTestContractJson.abi,
    wallet
  );

  const data = await contract.predictAddress(
    infoHash,
    secretHash,
    helperAdd
  );

  console.log(`Predicted address: ${data}`);
};

const deployMainContract = async () => {
  console.log("[Deploy main contract]");
  const factory = new ethers.ContractFactory(
    MainTestContractJson.abi,
    MainTestContractJson.bytecode,
    wallet
  );

  const contract = await factory.deploy();
  const result = await contract.waitForDeployment();

  const address = await result.getAddress();
  console.log(`Main contract address: ${address}`);

  return address;
};

const deployDeployHelper = async () => {
  console.log("[Deploy helper contract]");
  const factory = new ethers.ContractFactory(
    HelperContractJson.abi,
    HelperContractJson.bytecode,
    wallet
  );

  const contract = await factory.deploy();
  const result = await contract.waitForDeployment();

  const address = await result.getAddress();
  console.log(`Deploy helper address: ${address}`);

  return address;
};

const deployClaimReturnContractFromHelper = async (
  mainAdd: string,
  helperAdd: string
) => {
  console.log("[Deploy claim return contract from helper]");
  const helperContract = new ethers.Contract(
    helperAdd,
    HelperContractJson.abi,
    wallet
  );

  const { infoHash, secretHash } = makeHashedData();

  // call deploy function / returns (address)
  const contract = await helperContract.deployClaimToReturn(
    infoHash,
    secretHash,
    mainAdd,
    ClaimContractJson.bytecode,
    {
      value: ethers.parseEther("1"),
    }
  );

  console.log(`Claim contract address: ${contract.data}`);
};

const getDeployedContractAddress = async (helperAdd: string) => {
  const helperContract = new ethers.Contract(
    helperAdd,
    HelperContractJson.abi,
    wallet
  );

  const deployAddress = await helperContract.deployedContract();
  console.log(`Deployed contract address: ${deployAddress}`);

  return deployAddress;
};

const testGetDataFromCreate2DeployedContract = async (
  deployedAddress: string
) => {
  const contract = new ethers.Contract(
    deployedAddress,
    ClaimContractJson.abi,
    wallet
  );

  const { infoHash, secretHash } = makeHashedData();

  const data = await contract.testGetData();

  // change to strings
  /**
   * function testGetData() external view returns (bytes32, bytes32, uint256) {
        return (infoHash, secretHash, deployTime);
    }
   */
  console.log(`Info hash: ${infoHash}`);
  console.log(`Info hash by contract: ${data[0]}`);
  console.log(`Secret hash: ${secretHash}`);
  console.log(`Secret hash by contract: ${data[1]}`);
  console.log(`Deploy time by contract: ${data[2].toString()}`);
};
main();
