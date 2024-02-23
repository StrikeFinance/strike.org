import { initializeConnector } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { WalletConnect } from '@web3-react/walletconnect-v2';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { BitgetWallet } from './Bitkeep';
import { WEB3_PROVIDER } from '../utilities/constants';

const MAIN_CHAIN_IDS = [1];
const TEST_CHAIN_IDS = [5];
export const CHAIN_IDS =
  process.env.REACT_APP_ENV === 'prod' ? MAIN_CHAIN_IDS : TEST_CHAIN_IDS;

const [web3Metamask, web3MetamaskHooks] = initializeConnector(
  actions => new MetaMask({ actions })
);

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector(
  actions =>
    new CoinbaseWallet({
      actions,
      options: {
        url: WEB3_PROVIDER[CHAIN_IDS[localStorage.getItem('network') || 0]],
        appName: 'Strike'
        // appLogoUrl: coinbaseWallet,
        // reloadOnDisconnect: false,
      }
    })
);

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector(
  actions =>
    new WalletConnect({
      actions,
      options: {
        projectId: process.env.REACT_APP_WEB3_WALLET_PROJECT_ID,
        chains: CHAIN_IDS,
        optionalChains: CHAIN_IDS,
        showQrModal: true,
        rpcMap: [WEB3_PROVIDER[process.env.REACT_APP_ENV === 'prod' ? 1 : 5]]
      }
    })
);

const [web3Bitkeep, web3BitkeepHooks] = initializeConnector(
  actions =>
    new BitgetWallet({
      actions,
      options: {
        shimDisconnect: true
      }
    })
);

const connectors = [
  {
    id: 1,
    provider: web3Metamask,
    name: 'MetaMask'
  },
  {
    id: 2,
    provider: web3Bitkeep,
    name: 'Bitget Wallet'
  },
  {
    id: 3,
    provider: web3WalletConnect,
    name: 'Wallet Connect'
  },
  {
    id: 4,
    provider: web3CoinbaseWallet,
    name: 'Coinbase'
  }
];

export const installExtentionLinks = {
  1: {
    desc: 'Metamask_not_installed',
    linkDesc: 'You_can_download_here',
    link: 'https://metamask.io'
  },
  2: {
    desc: 'Bitget_not_installed',
    linkDesc: 'You_can_download_here',
    link: 'https://web3.bitget.com/en/wallet-download'
  }
};

export const libraries = [
  [web3Metamask, web3MetamaskHooks],
  [web3Bitkeep, web3BitkeepHooks],
  [web3WalletConnect, web3WalletConnectHooks],
  [web3CoinbaseWallet, web3CoinbaseWalletHooks]
];
export const connectorLocalStorageKey = 'connectorId';

export default connectors;
