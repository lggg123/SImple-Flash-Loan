const ethers = require('ethers');

class KyberswapContract {
  constructor(tokenIn, tokenOut, provider) {
    this.tokenIn = tokenIn;
    this.tokenOut = tokenOut;
    this.provider = provider;

    this.abi = [
      'function getExpectedRate(address src, address dest, uint srcQty) public view returns (uint expectedRate, uint slippageRate)',
      'function trade(address src, uint srcAmount, address dest, address destAddress, uint maxDestAmount, uint minConversionRate, address walletId) external payable returns (uint)',
    ];
    this.contract = new ethers.Contract(
      '0x818E6FECD516Ecc3849DAf6845e3EC868087B755',
      this.abi,
      this.provider
    );
  }

  async getExpectedRate(amountIn) {
    const [expectedRate, slippageRate] = await this.contract.getExpectedRate(this.tokenIn, this.tokenOut, amountIn);
    return expectedRate;
  }

  async trade(amountIn, amountOutMin, to) {
    const value = ethers.utils.parseEther(amountIn.toString());
    const minConversionRate = await this.getExpectedRate(value);
    const tx = await this.contract.trade(this.tokenIn, value, this.tokenOut, to, ethers.constants.MaxUint256, minConversionRate, ethers.constants.AddressZero, { value });
    await tx.wait();
    return tx.hash;
  }
}

module.exports = KyberswapContract;
