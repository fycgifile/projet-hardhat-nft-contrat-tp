const { task } = require("hardhat/config");
const { getAccount } = require("./helpers");

task("metamask-account", "Affiche l'adresse MetaMask du compte lié").setAction(async function (taskArguments, hre) {
    const account = getAccount();
    console.log(`Adresse du Wallet MetaMask : ${account.address} `);
});

task("metamask-balance", "Affiche la balance MetaMask du compte lié").setAction(async function (taskArguments, hre) {
    const account = getAccount();
    console.log(`Total de la balance MetaMask : ${await account.getBalance()}`);
});

task("deploy-nftpicture", "Déploiement du contrat NFTPICTURE ").setAction(async function (taskArguments, hre) {
    const nftContractFactory = await hre.ethers.getContractFactory("NFTPICTURE", getAccount());
    const nft = await nftContractFactory.deploy();
    console.log(`Adresse du contrat NFT : ${nft.address}`);
});