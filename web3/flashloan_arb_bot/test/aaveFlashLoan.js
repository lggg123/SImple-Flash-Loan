const ethers = require('ethers');

class AaveFlashLoan {
  constructor(provider) {
    this.provider = provider;

    this.abi = [
      'function flashLoan(address receiverAddress, address[] calldata assets, uint256[] calldata amounts, uint256[] calldata modes, address onBehalfOf, bytes calldata params, uint16 referralCode) external',
    ];
    this.contract = new ethers.Contract(
      '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
      this.abi,
      this.provider
    );
  }

  async executeFlashLoan(receiverAddress, assets, amounts, modes, onBehalfOf, params, referralCode) {
    const tx = await this.contract.flashLoan(receiverAddress, assets, amounts, modes, onBehalfOf, params, referralCode);
    await tx.wait();
    return tx.hash;
  }
}

module.exports = AaveFlashLoan;
