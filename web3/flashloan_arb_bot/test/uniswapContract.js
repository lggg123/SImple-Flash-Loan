const ethers = require('ethers');

class UniswapContract {
  constructor(tokenIn, tokenOut, provider) {
    this.tokenIn = tokenIn;
    this.tokenOut = tokenOut;
    this.provider = provider;

    this.abi = [
      'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    ];
    this.contract = new ethers.Contract(
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      this.abi,
      this.provider
    );
  }

  async getAmountsOut(amountIn) {
    const amounts = await this.contract.getAmountsOut(amountIn, [this.tokenIn, this.tokenOut]);
    return amounts[1];
  }

  async swapExactTokensForTokens(amountIn, amountOutMin, to) {
    const path = [this.tokenIn, this.tokenOut];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10; // 10 minutes from now
    const tx = await this.contract.swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline);
    await tx.wait();
    return tx.hash;
  }
}

module.exports = UniswapContract;