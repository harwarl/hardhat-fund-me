const { getNamedAccounts, ethers } = require('hardhat')

async function main() {
    //get deployer
    //get contract using deployer
    //deploy contract and call any of the functions you need

    const { deployer } = await getNamedAccounts()
    const fundMe = await ethers.getContract('FundMe', deployer)
    console.log('Funding contract............................')
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait(1)
    console.log('withdrawn.........')
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        process.exit(1)
    })
