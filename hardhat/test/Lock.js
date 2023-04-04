const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("MyToken", function () {
  it("Should mint tokens correctly", async function () {
      const MyToken = await ethers.getContractFactory("MyToken");
      const myToken = await MyToken.deploy();
      await myToken.deployed();

      const tokenDetailsId = 1;
      const tokenPrice = ethers.utils.parseEther("0.1");
      const tokenSupply = 1000000;

      await myToken.mintTokens(tokenDetailsId, tokenPrice, tokenSupply);

      const tokenDetails = await myToken._idToTokenDetails(tokenDetailsId);
      expect(tokenDetails.seller).to.equal(await ethers.provider.getSigner(0).getAddress());
      expect(tokenDetails.tokenPrice).to.equal(tokenPrice);
      expect(tokenDetails.tokenSupply).to.equal(tokenSupply * 10 ** 18);
  });
});




