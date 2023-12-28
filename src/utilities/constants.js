import usdtImg from 'assets/img/homepage/usdt.svg';
import usdcImg from 'assets/img/homepage/usdc.png';
import daiImg from 'assets/img/homepage/dai.png';
import wbtcImg from 'assets/img/homepage/wbtc.png';
import ethImg from 'assets/img/homepage/eth.svg';
// import bnbImg from 'assets/img/homepage/bnb.png';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const CONTRACT_ADDRESS = {
  1: {
    eth: ZERO_ADDRESS,
    usdt: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    usdc: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    dai: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    wbtc: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    strk: '0x74232704659ef37c08995e386A2E26cc27a8d7B1',
    sale: process.env.REACT_APP_MAIN_ETH_SALE_ADDRESS
  },
  5: {
    eth: ZERO_ADDRESS,
    usdt: '0x7DC7649B86e53bE7c1f2b3b97e416fE27C55C611',
    usdc: '0x5315BdB4991aB879432E059137405D5A053A03d0',
    dai: '0x3f8144A8E672758aDbE245788fbB8E92f483a9Cc',
    wbtc: '0xaeacE1A4B0A8bC686600A74DDb9FD0A629133F69',
    strk: '0x0a4CC7200FF099154caE7C660b1341ba4a1c3dd8',
    sale: process.env.REACT_APP_TEST_ETH_SALE_ADDRESS
  }
};

export const ASSET = {
  1: {
    eth: {
      image: ethImg,
      decimal: 18
    },
    usdt: {
      image: usdtImg,
      decimal: 6
    },
    usdc: {
      image: usdcImg,
      decimal: 6
    },
    dai: {
      image: daiImg,
      decimal: 18
    },
    wbtc: {
      image: wbtcImg,
      decimal: 8
    }
  },
  5: {
    eth: {
      image: ethImg,
      decimal: 18
    },
    usdt: {
      image: usdtImg,
      decimal: 6
    },
    usdc: {
      image: usdcImg,
      decimal: 6
    },
    dai: {
      image: daiImg,
      decimal: 18
    },
    wbtc: {
      image: wbtcImg,
      decimal: 8
    }
  }
};

export const SUBGRAPH_API_URL = {
  1: process.env.REACT_APP_MAIN_ETH_THE_GRAPH,
  5: process.env.REACT_APP_TEST_ETH_THE_GRAPH
};

export const WEB3_PROVIDER = {
  1: process.env.REACT_APP_MAIN_ETH_WEB3_PROVIDER,
  5: process.env.REACT_APP_TEST_ETH_WEB3_PROVIDER
};

export const getAssetDecimal = (tokenAddress, chainId) => {
  let asset;
  Object.keys(CONTRACT_ADDRESS[chainId]).forEach(key => {
    if (CONTRACT_ADDRESS[chainId][key].toLowerCase() === tokenAddress) {
      asset = key;
    }
  });
  return ASSET[chainId][asset].decimal;
};

export const getAssetName = (tokenAddress, chainId) => {
  let asset;
  Object.keys(CONTRACT_ADDRESS[chainId]).forEach(key => {
    if (CONTRACT_ADDRESS[chainId][key].toLowerCase() === tokenAddress) {
      asset = key;
    }
  });
  return asset.toUpperCase();
};
