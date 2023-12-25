import {
  currentProvider,
  getDownload,
  getIsInstall,
  installWalletMessage
} from '@bitget-wallet/web3-sdk';
import { Connector } from '@web3-react/types';

function parseChainId(chainId) {
  return Number.parseInt(chainId, 16);
}

export class BitgetWallet extends Connector {
  constructor({ actions, options, onError }) {
    super(actions, onError);
    this.options = options;
  }

  async isomorphicInitialize() {
    const provider = currentProvider();
    if (getIsInstall()) {
      this.provider = provider;
      this.provider.on('connect', ({ chainId }) => {
        this.actions.update({ chainId: parseChainId(chainId) });
      });
      this.provider.on('disconnect', error => {
        // 1013 indicates that BitgetWallet is attempting to reestablish the connection
        // https://github.com/BitgetWallet/providers/releases/tag/v8.0.0
        if (error.code === 1013) {
          console.debug(
            'BitgetWallet logged connection error 1013: "Try again later"'
          );
          return;
        }
        this.actions.resetState();
        this.onError(error);
      });

      this.provider.on('chainChanged', chainId => {
        this.actions.update({ chainId: parseChainId(chainId) });
      });

      this.provider.on('accountsChanged', accounts => {
        if (accounts.length === 0) {
          // handle this edge case by disconnecting
          this.actions.resetState();
        } else {
          this.actions.update({ accounts });
        }
      });
    } else {
      window.open(getDownload(), '_blank');
      throw new Error(installWalletMessage);
    }
  }

  // eslint-disable-next-line consistent-return
  async connectEagerly() {
    const cancelActivation = this.actions.startActivation();
    try {
      await this.isomorphicInitialize();
      if (!this.provider) return cancelActivation();

      // Wallets may resolve eth_chainId and hang on eth_accounts pending user interaction, which may include changing
      // chains; they should be requested serially, with accounts first, so that the chainId can settle.
      const accounts = await this.provider.request({ method: 'eth_accounts' });
      if (!accounts.length) throw new Error('No accounts returned');
      const chainId = await this.provider.request({ method: 'eth_chainId' });
      this.actions.update({ chainId: parseChainId(chainId), accounts });
    } catch (error) {
      console.debug('Could not connect eagerly', error);
      // we should be able to use `cancelActivation` here, but on mobile, Bitget Wallet emits a 'connect'
      // event, meaning that chainId is updated, and cancelActivation doesn't work because an intermediary
      // update has occurred, so we reset state instead
      this.actions.resetState();
    }
  }

  async activate(desiredChainIdOrChainParameters) {
    let cancelActivation;
    if (!this.provider?.isConnected?.())
      cancelActivation = this.actions.startActivation();

    return this.isomorphicInitialize()
      .then(async () => {
        // Wallets may resolve eth_chainId and hang on eth_accounts pending user interaction, which may include changing
        // chains; they should be requested serially, with accounts first, so that the chainId can settle.
        const accounts = await this.provider.request({
          method: 'eth_requestAccounts'
        });
        const chainId = await this.provider.request({ method: 'eth_chainId' });
        const receivedChainId = parseChainId(chainId);
        const desiredChainId =
          typeof desiredChainIdOrChainParameters === 'number'
            ? desiredChainIdOrChainParameters
            : desiredChainIdOrChainParameters?.chainId;

        // if there's no desired chain, or it's equal to the received, update
        if (!desiredChainId || receivedChainId === desiredChainId)
          return this.actions.update({ chainId: receivedChainId, accounts });

        const desiredChainIdHex = `0x${desiredChainId.toString(16)}`;

        // if we're here, we can try to switch networks
        return this.provider
          .request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: desiredChainIdHex }]
          })
          .catch(error => {
            const errorCode = error.data?.originalError?.code || error.code;
            if (
              errorCode === 4902 &&
              typeof desiredChainIdOrChainParameters !== 'number'
            ) {
              if (!this.provider) throw new Error('No provider');
              // if we're here, we can try to add a new network
              return this.provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    ...desiredChainIdOrChainParameters,
                    chainId: desiredChainIdHex
                  }
                ]
              });
            }
            throw error;
          })
          .then(() => this.activate(desiredChainId));
      })
      .catch(error => {
        if (cancelActivation) cancelActivation();
        throw error;
      });
  }

  async watchAsset({ address, symbol, decimals, image }) {
    if (!this.provider) throw new Error('No provider');

    return this.provider
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            image // A string url of the token logo
          }
        }
      })
      .then(success => {
        if (!success) throw new Error('Rejected');
        return true;
      });
  }
}
