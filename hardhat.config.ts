import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

// const hre = require('hardhat');
const ethers = require("ethers");
const gasPriceWei = ethers.parseUnits("0.01", "gwei");
const gasPrice = gasPriceWei.toString();

module.exports = {
    solidity: "0.8.20",
    defaultNetwork: "hardhat",
    paths: {
        artifacts: "./src/artifacts",
        cache: "./cache",
    },
    // npx hardhat run --network localhost scripts/deploy.js
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                enable: true,
                url: process.env.MAINNET_RPC,
                gasPrice: parseInt(gasPrice),
            },
            loggingEnabled: true,
        },
        // scroll: {
        //     chainId: 534353,
        //     initialBaseFeePerGas: 0,
        //     loggingEnabled: true,
        //     type: "hardhat",
        //     gasPrice: parseInt(gasPrice),
        //     url: 'https://alpha-rpc.scroll.io/l2',
        //     accounts: ['']
        // },
        // localhost_fork: {
        //   chainId: 31337,
        //   forking: {
        //     url: process.env.MAINNET_RPC_URL,
        //     blockNumber: 16024306,
        //   },
        //   url: "http://127.0.0.1:8545/",
        //   initialBaseFeePerGas: 0,
        //   loggingEnabled: true,
        //   gasPrice: parseInt(gasPrice)
        // },
        // new_localhost: {
        //   chainId: 31337,
        //   url: "http://127.0.0.1:8545/",
        //   initialBaseFeePerGas: 0,
        //   loggingEnabled: true,
        //   // gasPrice: parseInt(gasPrice)
        // },
        // remain_localhost: {
        //     chainId: 44444,
        //     url: "http://localhost:8545",
        //     initialBaseFeePerGas: 0,
        //     loggingEnabled: true,
        //     type: "hardhat",
        //     gasPrice: parseInt(gasPrice)
        // },
        // Test Network
        // go: {
        //   chainId: 31337,
        //   url: "http://127.0.0.1:8545/",
        //   gasPrice: parseInt(gasPrice),
        //   initialBaseFeePerGas: 0,
        //   loggingEnabled: true,
        // },
        // baobab: {
        //   chainId: 31337,
        //   url: "http://127.0.0.1:8545/",
        //   gasPrice: parseInt(gasPrice),
        //   initialBaseFeePerGas: 0,
        //   loggingEnabled: true,
        // },
        // Main Network
    },
    settings: {
        optimizer: {
            viaIR: true,
            enabled: true,
            runs: 6000,
        },
    },
};
