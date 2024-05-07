import { ethers } from "ethers";
import LockContractJson from "./src/artifacts/contracts/Lock.sol/Lock.json";

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

export const changeBlock = async () => {
  console.log("[Change block]");
  const currentBlock = await provider.getBlockNumber();
  const currentTimestamp = (await provider.getBlock(currentBlock))!.timestamp;
  console.log(`Current block: ${currentBlock}`);
  console.log(`Current timestamp: ${currentTimestamp}`);

  await mineBlock(20);

  const newBlock = await provider.getBlockNumber();
  const newTimestamp = (await provider.getBlock(newBlock))!.timestamp;

  console.log(`New block: ${newBlock}`);
  console.log(`New timestamp: ${newTimestamp}`);
};

export const mineBlock = async (block: number) => {
  for (let i = 0; i < block; i++) {
    await provider.send("evm_mine", []);
  }
};

export const makeHashedData = () => {
  const nftID = 1;
  const amount = 1;
  const randomNum = 4;
  const serverSecret = "hello";

  const infoEncode = ethers.solidityPacked(
    ["uint256", "uint256", "uint256"],
    [nftID, amount, randomNum]
  );

  const infoHash = ethers.keccak256(infoEncode); 

  const secretEncode = ethers.solidityPacked(
    ["bytes", "bytes"],
    [infoHash, ethers.toUtf8Bytes(serverSecret)]
  );

  const secretHash = ethers.keccak256(secretEncode);

  return { infoHash, secretHash };
};

export const bytecodeSameTest = async () => {
  console.log("[Bytecode same test]");
  const address = "0x8a791620dd6260079bf849dc5567adc3f2fdc318";
  const contract = new ethers.Contract(address, LockContractJson.abi);

  const result = await contract.isCodeSame(address);
  console.log(`Result : ${result}`);
};

export const encodeTest = async () => {
  console.log("[Encode test]");
  const add = "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9";

  const num = 1;

  const contract = new ethers.Contract(add, LockContractJson.abi);

  const data1 = await contract.test1(num);
  const data2 = await contract.test2(num);

  console.log(`Data1: ${data1}`);
  console.log(`Data2: ${data2}`);

  // num
  const data3 = ethers.keccak256(ethers.solidityPacked(["uint256"], [num]));

  console.log(`Data3: ${data3}`);
};
