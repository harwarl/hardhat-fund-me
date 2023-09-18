const networkConfig = {
    11155111: {
        name: 'sepolia',
        ethUsdPriceFeedAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
    },
    5: {
        name: 'goerli',
        ethUsdPriceFeedAddress: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e',
    },
}

const developmentChains = ['hardhat', 'localhost']
const DECIMAL = 8
const INITIAL_ANSWER = 200000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMAL,
    INITIAL_ANSWER,
}
