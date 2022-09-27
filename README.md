# projet-hardhat-nft-contrat-tp

```sh
npm install
cp .env.example .env
```

Modifier les variables d'environnement

```sh
npx hardhat compile
npx hardhat deploy-nftpicture
```

Modifier la varible d'env NFT_CONTRACT_ADDRESS avec l'adresse du contrat retourné

```sh
npx ipfs-car --pack images --output images.car
npx ipfs-car --pack metadata --output metadata.car
npx hardhat set-base-token-uri-nftpicture --base-url "https://YOUR_CID_METADATA_STORAGE_LINK.ipfs.nftstorage.link/metadata/"
npx hardhat mint-nftpicture --address YOUR_ADDRESS_METAMASK
npx hardhat token-uri-nftpicture --token-id 1
npx hardhat verify {NFT_CONTRACT_ADDRESS}```
