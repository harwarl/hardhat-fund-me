const { network } = require('hardhat')
const { networkConfig, developmentChains } = require('../helper-hardhat-config')
const { verify } = require('../utils/verify')

//gives the deploy and log function
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    //get the network chainId
    const chainId = network.config.chainId
    console.log(chainId)

    //use chain Id to get the corresponding pricefeed address
    //adjust to get price from mock deployment if on development network
    let ethUsdPriceFeedAddress
    console.log(network.name)
    if (developmentChains.includes(network.name)) {
        const ethUsdAggregator = await deployments.get('MockV3Aggregator')
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress =
            networkConfig[chainId]['ethUsdPriceFeedAddress']
    }

    const args = [ethUsdPriceFeedAddress]

    //deploy fund me contract
    const fundMe = await deploy('FundMe', {
        from: deployer,
        args: args, //should be price feed address in here
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log('------------------------------------------------------------------')

    //to Verify
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
}

module.exports.tags = ['all', 'Fundme']
