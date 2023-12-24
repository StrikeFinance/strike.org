import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import * as constants from '../utilities/constants';
import connectors, { CHAIN_IDS, connectorLocalStorageKey } from '../connectors';

export function useActiveWeb3React() {
  const currentChainId =
    useSelector(({ application }) => application.currentChainId) ||
    CHAIN_IDS[localStorage.getItem('network') || 0];

  const context = useWeb3React();
  const activeContext = context;
  activeContext.requiredChainId = currentChainId;
  // if (context.chainId !== currentChainId) {
  //   context.account = null;
  // }
  return activeContext;
}

export const getWeb3NoAccount = chainId => {
  const rpcProvider = constants.WEB3_PROVIDER[chainId];
  const httpProvider = new Web3.providers.HttpProvider(rpcProvider, {
    timeout: 30000
  });
  const web3NoAccount = new Web3(httpProvider);
  return web3NoAccount;
};

export const useWeb3 = () => {
  const { provider, chainId, requiredChainId, isActive } = useActiveWeb3React();
  // const refEth = useRef(provider);
  const [web3, setweb3] = useState(getWeb3NoAccount(requiredChainId));
  useEffect(() => {
    // if (provider !== refEth.current) {
    //   setweb3(isActive ? new Web3(provider.provider) : getWeb3NoAccount());
    //   refEth.current = provider;
    // }
    setweb3(
      isActive && chainId === requiredChainId && provider
        ? new Web3(provider.provider)
        : getWeb3NoAccount(requiredChainId)
    );
  }, [provider, isActive, chainId, requiredChainId]);
  return web3;
};

export function useEagerConnect() {
  const { account, chainId, requiredChainId, connector } = useWeb3React();

  const activeConnector = async tempConnector => {
    if ((requiredChainId === chainId && account) || !tempConnector) {
      return;
    }

    await tempConnector
      .connectEagerly(parseInt(requiredChainId, 10))
      .then(async () => {})
      .catch(() => {});
  };
  // // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey);
    if (connectorId) {
      const tempConnector = connectors[parseInt(connectorId, 10) - 1]?.provider;
      if (tempConnector && !account) {
        activeConnector(tempConnector);
      }
    }
  }, []);

  useEffect(() => {
    // let timer = setTimeout(() => {
    if (chainId && chainId !== requiredChainId) {
      if (connector instanceof CoinbaseWallet) {
        return;
      }
      if (connector.deactivate) {
        connector.deactivate();
      }
      if (connector) {
        connector.resetState();
      }
    } else {
      // activeConnector(connector)
    }
    // }, 1000);
    // return (() => clearTimeout(timer))
  }, [chainId, requiredChainId]);
}
