const assert = require("assert");
const Web3 = require('web3');
const { request } = require('graphql-request');

const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_ENDPOINT));
const NETWORK = 'mainnet';

const SUSHISWAP_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange';
const UNISWAP_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';
const KYBERSWAP_ENDPOINT = 'https://api.thegraph.com/subgraphs/name/kyber-network/public';

describe('Flash Loan Arbitage Bot', function() {
    it('should scan Sushiswap and retrieve market data', async function() {
        const sushiswapQuery = `
            query SushiSwapQuery {
                pairs {where: token0: "0x6b175474e89094c44da98b954eedeac495271d0f", token1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"}) {
                    token0Price
                    token1Price
                    reserve0
                    reserve1
                    reserveUSD
                }
            }
        `;

        const sushiswapData = await request(SUSHISWAP_ENDPOINT, sushiswapQuery);
        assert.notEqual(sushiswapData, null);
    });
    it('should scan Uniswap and retrieve market data', async function() {
        const uniswapQuery = `
            query UniSwapQuery {
                pairs {id: "0x6b175474e89094c44da98b954eedeac495271d0f"} {
                    token0Price
                    token1Price
                    reserve0
                    reserve1
                    reserveUSD
                }
            }
        `;

        const uniswapData = await request(UNISWAP_ENDPOINT, uniswapQuery);
        assert.notEqual(uniswapData, null);
    });
    it('should scan KyberSwap and retrieve market data', async function() {
        const kyberswapQuery = `
            query KyberSwapQuery {
                reserves(where: {src: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", dst: "0x6b175474e89094c44da98b954eedeac495271d0f"}) {
                    srcQty
                    dstQty
                }
            }
        `;

        const kyberswapData =  await request(KYBERSWAP_ENDPOINT, kyberswapQuery);
        assert.notEqual(kyberswapData, null);
    });
    it('should identify an arbitrage opportunity', async function () {
        // Simulate market conditions where there is a profitable arbitrage opportunity
        const sushiswapData = { pairs: [{ token0Price: 1, token1Price: 4000  }]};
        const uniswapData = { pair: { token0Price: 1, token1Price: 3800 } };
        const kyberswapData = { reserves: [{ srcQty: 100, dstQty: 0.25 }] };

        // Mock the Aave Flash Loan Provider
        const flashLoanProvider = {
            provide: async (amount, asset) => {
                return {
                    amount: amount,
                    asset: asset
                };
            }
        };

        // Mock the Uniswap and Sushiswap trading conntracts
        const uniswapContract = {
            trade: async (inputAsset, outputAsset, amount) => {
                return amount * uniswapData.pair.token1Price / uniswapData.pair.token0Price;
            }
        };
        const sushiswapContract = {
            swapExactTokensForTokens: async (amount, inputAsset, outputAsset) => {
                return amount * sushiswapData.pairs[0].token1Price / sushiswapData.pairs[0].token0Price;
            }
        };
        const kyberswapContract = {
            getExpectedRate: async (srcToken, dstToken, srcQty) => {
                return kyberswapData.reserves[0];
            },
            trade: async (srcToken, srcAmount, dstToken, dstAddress, maxDestAmount, minConversionRate, walletId) => {
                return dstAmount;
            }
        };

        // Use the arbitrage bot script to find the arbitrage opportunity
        const arbitrageBot = new ArbitrageBot(flashLoanProvider, uniswapContract, sushiswapContract, kyberswapContract, web3, NETWORK);
        const opportunity = await arbitrageBot.findArbitrageOpportunity();

        // Verify that the opportunity was found
        assert.equal(opportunity, true);

        // Verify that the arbitrage trade was executed correctly
        const expectedProfit = 60;
        assert.equal(arbitrageBot.profit, expectedProfit);
    });
})