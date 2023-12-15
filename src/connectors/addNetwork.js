import { connectorLocalStorageKey } from 'connectors';
import { CHAINS } from '../chain';

export const setNetwork = async chainId => {
  const provider = window.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: CHAINS[chainId].name,
            nativeCurrency: CHAINS[chainId].nativeCurrency,
            rpcUrls: CHAINS[chainId].urls,
            blockExplorerUrls: CHAINS[chainId].blockExplorerUrls
          }
        ]
      });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the Mainnet network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

export const switchNetwork = async chainId => {
  const provider =
    Number(localStorage.getItem(connectorLocalStorageKey)) === 2
      ? window.bitkeep.ethereum
      : window.ethereum;
  if (provider) {
    try {
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`
          }
        ]
      });
      return true;
    } catch (error) {
      if (error?.code === 4902) {
        const hasSetup = await setNetwork(chainId);
        if (hasSetup) {
          return true;
        }
      }
      console.error(error);
      return false;
    }
  } else {
    console.log('No Metamask Wallet');
    return true;
  }
};
