import { WEB3_PROVIDER } from './utilities/constants';

const ETH = {
  name: 'ETH',
  symbol: 'ETH',
  decimals: 18
};

const BNB = {
  name: 'BNB',
  symbol: 'BNB',
  decimals: 18
};

const TETH = {
  name: 'Test ETH',
  symbol: 'tETH',
  decimals: 18
};

export const CHAINS = {
  // Mainnet
  1: {
    urls: [WEB3_PROVIDER[1]],
    name: 'Ethereum Mainnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://etherscan.io/']
  },
  56: {
    urls: [WEB3_PROVIDER[56]],
    name: 'BNB Chain',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://bscscan.com']
  },
  42161: {
    urls: [WEB3_PROVIDER[42161]],
    name: 'Arbitrum',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://arbiscan.io/']
  },

  // Testnet
  5: {
    urls: [WEB3_PROVIDER[5]],
    name: 'Goerli Testnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli.etherscan.io/']
  },
  97: {
    urls: [WEB3_PROVIDER[97]],
    name: 'BNB Testnet',
    nativeCurrency: BNB,
    blockExplorerUrls: ['https://testnet.bscscan.com']
  },
  421613: {
    urls: [WEB3_PROVIDER[421613]],
    name: 'Arbitrum Goerli',
    nativeCurrency: TETH,
    blockExplorerUrls: ['https://goerli.arbiscan.io/']
  }
};

function isExtendedChainInformation(chainInformation) {
  return !!chainInformation.nativeCurrency;
}

export function getAddChainParameters(chainId) {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls
    };
  }

  return chainId;
}

export const URLS = Object.keys(CHAINS).reduce((accumulator, chainId) => {
  const validURLs = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
