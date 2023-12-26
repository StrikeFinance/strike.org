import { WEB3_PROVIDER } from './utilities/constants';

const ETH = {
  name: 'ETH',
  symbol: 'ETH',
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

  // Testnet
  5: {
    urls: [WEB3_PROVIDER[5]],
    name: 'Goerli Testnet',
    nativeCurrency: ETH,
    blockExplorerUrls: ['https://goerli.etherscan.io/']
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
