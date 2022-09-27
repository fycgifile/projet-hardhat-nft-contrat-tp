const { ethers } = require("ethers");
const { getContractAt } = require("@nomiclabs/hardhat-ethers/internal/helpers");

// Récuperation des variables d'environnements
function getEnvVariable(key, defaultValue) {
    if (process.env[key]) {
        return process.env[key];
    }
    if (!defaultValue) {
        throw `${key} non définie`;
    }
    return defaultValue;
}

// Récuperation d'un fournisseur de connexion au réseau Ethereum selon la var d'env NETWORK
function getProvider() {
    return ethers.getDefaultProvider(getEnvVariable("NETWORK", "goerli"), {
        alchemy: getEnvVariable("ALCHEMY_KEY"),
    });
}

// Récuperation des informations du compte selon la var d'env METAMASK_KEY
function getAccount() {
    return new ethers.Wallet(getEnvVariable("METAMASK_KEY"), getProvider());
}

// Récuperation instance de contrat pour l'adresse du contrat donnée selon la var d'env NFT_CONTRACT_ADDRESS
function getContract(contractName, hre) {
    const account = getAccount();
    return getContractAt(hre, contractName, getEnvVariable("NFT_CONTRACT_ADDRESS"), account);
}
 
module.exports = {
    getEnvVariable,
    getProvider,
    getAccount,
    getContract
}

