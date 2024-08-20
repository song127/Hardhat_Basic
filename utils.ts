import { ethers } from "ethers";

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