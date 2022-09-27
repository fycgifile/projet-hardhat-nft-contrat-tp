const { task } = require("hardhat/config");
const { getContract } = require("./helpers");
const fetch = require("node-fetch");

task("mint-nftpicture", "Minte du contrat NFTPICTURE")
    .addParam("address", "Wallet Adresse qui recoit le NFT")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContract("NFTPICTURE", hre);
        const transactionResponse = await contract.mintTo(taskArguments.address, {
            gasLimit: 500_000,
            value: ethers.utils.parseEther("0.00008")
        }); 
        console.log(`Hash de la transaction : ${transactionResponse.hash}`);
    });

task("set-base-token-uri-nftpicture", "Défini l'URI du jeton pour le contrat déployé")
    .addParam("baseUrl", "L'URL de terminaison de tokenUri")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContract("NFTPICTURE", hre);
        const transactionResponse = await contract.setBaseTokenURI(taskArguments.baseUrl, {
            gasLimit: 500_000,
        });
        console.log(`Hash de la transaction : ${transactionResponse.hash}`);
    });


task("token-uri-nftpicture", "Récupère les métadonnées du jeton pour le tokenId")
    .addParam("tokenId", "tokenId pour récupérer les méta")
    .setAction(async function (taskArguments, hre) {
        const contract = await getContract("NFTPICTURE", hre);
        const response = await contract.tokenURI(taskArguments.tokenId, {
            gasLimit: 500_000,
        });

        const metadata_url = response;
        const metadata = await fetch(metadata_url).then(res => res.json());
        console.log(`URL du fichier metadata : ${metadata_url}`);
        console.log(`Contenu de metadata: ${JSON.stringify(metadata, null, 2)}`);
    });
