const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("Deploy Gas Challenge Contract", () => {
  let gas_contract;

  beforeEach(async () => {
    const gas_challenge_contract = await ethers.getContractFactory(
      "gasChallenge"
    );
    gas_contract = await gas_challenge_contract.deploy();
  });

  describe("Compute Gas", () => {
    it("Should return lower gas", async () => {
      await gas_contract.notOptimizedFunction();
      await gas_contract.optimizedFunction();
      await gas_contract.optimizedFunction2();
    });
  });

  describe("Check Sum Of Array", () => {
    it("Should return 0", async () => {
      await gas_contract.optimizedFunction();
      expect(await gas_contract.getSumOfArray()).to.be.equals(Number(0));
    });

    it("Should return 0 by second technique", async () => {
      await gas_contract.optimizedFunction2();
      expect(await gas_contract.getSumOfArray()).to.be.equals(Number(0));
    });
  });
});
