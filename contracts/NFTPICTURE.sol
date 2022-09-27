// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTPICTURE is ERC721, PullPayment, Ownable {
    uint256 public constant TOTAL_SUPPLY = 3;
    uint256 public constant MINT_PRICE = 0.00008 ether;
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;

    /// @dev URI de jeton utilisé comme préfixe par tokenURI().
    string public baseTokenURI;

    constructor() ERC721("NFTPictureTuto ", "NFTPICTURE") {
        baseTokenURI = "";
    }

    function mintTo(address recipient) public payable returns (uint256) {
        uint256 tokenId = currentTokenId.current();
        require(tokenId < TOTAL_SUPPLY, "Approvisionnement max atteint");
        require(
            msg.value == MINT_PRICE,
            "La valeur de la transaction n'etait pas egale au prix de la mint"
        );
        currentTokenId.increment();
        uint256 newItemId = currentTokenId.current();
        _safeMint(recipient, newItemId);
        return newItemId;
    }

    /// @dev Retourne une URI pour un tokenId donné
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    /// @dev Défini le prefix de URI du jeton.
    function setBaseTokenURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    /// @dev Override de la fonction afin d'en faire une fonction onlyOwner
    function withdrawPayments(address payable payee)
        public
        virtual
        override
        onlyOwner
    {
        super.withdrawPayments(payee);
    }
}