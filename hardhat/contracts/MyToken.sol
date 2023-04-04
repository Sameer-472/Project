// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MyToken is ERC20, ReentrancyGuard {
    address payable public owner;

    // token price come from the front-end 
    uint256 public maxTotalSupply = 1000000 * (10**18);

    constructor() ERC20("RealtToken", "RLT") {
        owner = payable(msg.sender);
    }

    event TokenListed (address indexed seller , string tokenId ,uint256 tokenPrice , uint256 tokenSupply);
    event TokensBought (address indexed buyer , string tokenId ,uint256 tokenAmount , uint256 pricePaid);

    struct TokenDetails{
        address payable seller;
        address payable buyer;
        uint256 tokenPrice;
        uint256 tokenSupply;
        uint256 NoOfTokensAmount;
    }

    mapping (string  => TokenDetails) public _idToTokenDetails;
    
    function listToken(string memory _tokenDetailsId , uint256 _tokenPrice , uint256 _tokenSupply) public {
        TokenDetails storage tokenDetails = _idToTokenDetails[_tokenDetailsId];
        tokenDetails.seller = payable(msg.sender);
        tokenDetails.tokenPrice = _tokenPrice;
        tokenDetails.tokenSupply = _tokenSupply * 10 **18;
        emit TokenListed(msg.sender , _tokenDetailsId , _tokenPrice , _tokenSupply);
        // _mint(address(this) , _tokenSupply *  (10**18));
    }

    function buyTokens(string memory _tokenDetailsId , uint256 _noOfTokens) public payable nonReentrant{   
        TokenDetails storage tokenDetails = _idToTokenDetails[_tokenDetailsId]; 
        uint256 requiredAmount = tokenDetails.tokenPrice * _noOfTokens;
        // uint256 decimalRequiredAmount = requiredAmount * (10**18);
        require(_noOfTokens <= tokenDetails.tokenSupply, "Exceed token supply");
        require(msg.value  >= requiredAmount, "transection failed 1");
        _mint(msg.sender , _noOfTokens * (10**18));
        (bool sent ,) = tokenDetails.seller.call{value: requiredAmount} ("");
        require(sent , "transection failed");
        tokenDetails.buyer = payable(msg.sender);
        tokenDetails.tokenSupply -= _noOfTokens * (10**18);
        emit TokensBought(msg.sender , _tokenDetailsId , _noOfTokens , requiredAmount);
        // require(transferFrom(address(this) , buyer , amount));
    }
}
