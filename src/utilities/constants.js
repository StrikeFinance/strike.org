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
    usdt: process.env.REACT_APP_MAIN_ETH_USDT_ADDRESS,
    usdc: process.env.REACT_APP_MAIN_ETH_USDC_ADDRESS,
    dai: process.env.REACT_APP_MAIN_ETH_DAI_ADDRESS,
    wbtc: process.env.REACT_APP_MAIN_ETH_WBTC_ADDRESS,
    strk: process.env.REACT_APP_MAIN_ETH_STRK_ADDRESS,
    sale: process.env.REACT_APP_MAIN_ETH_SALE_ADDRESS
  },
  // 56: {
  //   eth: ZERO_ADDRESS,
  //   usdt: process.env.REACT_APP_MAIN_BNB_USDT_ADDRESS,
  //   usdc: process.env.REACT_APP_MAIN_BNB_USDC_ADDRESS,
  //   dai: process.env.REACT_APP_MAIN_BNB_DAI_ADDRESS,
  //   strk: process.env.REACT_APP_MAIN_BNB_STRK_ADDRESS,
  //   sale: process.env.REACT_APP_MAIN_BNB_SALE_ADDRESS
  // },
  // 42161: {
  //   eth: ZERO_ADDRESS,
  //   usdt: process.env.REACT_APP_MAIN_ARB_USDT_ADDRESS,
  //   usdc: process.env.REACT_APP_MAIN_ARB_USDC_ADDRESS,
  //   dai: process.env.REACT_APP_MAIN_ARB_DAI_ADDRESS,
  //   strk: process.env.REACT_APP_MAIN_ARB_STRK_ADDRESS,
  //   sale: process.env.REACT_APP_MAIN_ARB_SALE_ADDRESS
  // },
  5: {
    eth: ZERO_ADDRESS,
    usdt: process.env.REACT_APP_TEST_ETH_USDT_ADDRESS,
    usdc: process.env.REACT_APP_TEST_ETH_USDC_ADDRESS,
    dai: process.env.REACT_APP_TEST_ETH_DAI_ADDRESS,
    wbtc: process.env.REACT_APP_TEST_ETH_WBTC_ADDRESS,
    strk: process.env.REACT_APP_TEST_ETH_STRK_ADDRESS,
    sale: process.env.REACT_APP_TEST_ETH_SALE_ADDRESS
  }
  // 97: {
  //   eth: ZERO_ADDRESS,
  //   usdt: process.env.REACT_APP_TEST_BNB_USDT_ADDRESS,
  //   usdc: process.env.REACT_APP_TEST_BNB_USDC_ADDRESS,
  //   dai: process.env.REACT_APP_TEST_BNB_DAI_ADDRESS,
  //   strk: process.env.REACT_APP_TEST_BNB_STRK_ADDRESS,
  //   sale: process.env.REACT_APP_TEST_BNB_SALE_ADDRESS
  // },
  // 421613: {
  //   eth: ZERO_ADDRESS,
  //   usdt: process.env.REACT_APP_TEST_ARB_USDT_ADDRESS,
  //   usdc: process.env.REACT_APP_TEST_ARB_USDC_ADDRESS,
  //   dai: process.env.REACT_APP_TEST_ARB_DAI_ADDRESS,
  //   strk: process.env.REACT_APP_TEST_ARB_STRK_ADDRESS,
  //   sale: process.env.REACT_APP_TEST_ARB_SALE_ADDRESS
  // }
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
  // 56: {
  //   eth: {
  //     image: bnbImg,
  //     decimal: 18
  //   },
  //   usdt: {
  //     image: usdtImg,
  //     decimal: 18
  //   },
  //   usdc: {
  //     image: usdcImg,
  //     decimal: 18
  //   },
  //   dai: {
  //     image: daiImg,
  //     decimal: 18
  //   }
  // },
  // 42161: {
  //   eth: {
  //     image: ethImg,
  //     decimal: 18
  //   },
  //   usdt: {
  //     image: usdtImg,
  //     decimal: 6
  //   },
  //   usdc: {
  //     image: usdcImg,
  //     decimal: 6
  //   },
  //   dai: {
  //     image: daiImg,
  //     decimal: 18
  //   }
  // },
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
  // 97: {
  //   eth: {
  //     image: bnbImg,
  //     decimal: 18
  //   },
  //   usdt: {
  //     image: usdtImg,
  //     decimal: 18
  //   },
  //   usdc: {
  //     image: usdcImg,
  //     decimal: 18
  //   },
  //   dai: {
  //     image: daiImg,
  //     decimal: 18
  //   }
  // },
  // 421613: {
  //   eth: {
  //     image: ethImg,
  //     decimal: 18
  //   },
  //   usdt: {
  //     image: usdtImg,
  //     decimal: 6
  //   },
  //   usdc: {
  //     image: usdcImg,
  //     decimal: 6
  //   },
  //   dai: {
  //     image: daiImg,
  //     decimal: 18
  //   }
  // }
};

export const SUBGRAPH_API_URL = {
  1: process.env.REACT_APP_MAIN_ETH_THE_GRAPH,
  // 56: process.env.REACT_APP_MAIN_BNB_THE_GRAPH,
  // 42161: process.env.REACT_APP_MAIN_ARB_THE_GRAPH,
  5: process.env.REACT_APP_TEST_ETH_THE_GRAPH
  // 97: process.env.REACT_APP_TEST_BNB_THE_GRAPH,
  // 421613: process.env.REACT_APP_TEST_ARB_THE_GRAPH
};

export const WEB3_PROVIDER = {
  1: process.env.REACT_APP_MAIN_ETH_WEB3_PROVIDER,
  // 56: process.env.REACT_APP_MAIN_BNB_WEB3_PROVIDER,
  // 42161: process.env.REACT_APP_MAIN_ARB_WEB3_PROVIDER,
  5: process.env.REACT_APP_TEST_ETH_WEB3_PROVIDER
  // 97: process.env.REACT_APP_TEST_BNB_WEB3_PROVIDER,
  // 421613: process.env.REACT_APP_TEST_ARB_WEB3_PROVIDER
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
