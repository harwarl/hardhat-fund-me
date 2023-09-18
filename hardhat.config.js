require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
require('dotenv/config')

/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY || ''
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || ''
module.exports = {
    solidity: {
        compilers: [{ version: '0.8.7' }, { version: '0.6.6' }],
    },
    defaultNetwork: 'hardhat',
    networks: {
        localhost: {
            url: 'http://127.0.0.1:8545/',
            chainId: 31337,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: 'gas-reporter.txt',
        noColors: true,
        currency: 'USD',
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        token: 'MATIC',
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
