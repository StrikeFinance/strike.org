import { CHAIN_IDS } from 'connectors';

const auth = {
  user: null
};

const account = {
  setting: {
    selectedAddress: null,
    marketType: 'supply',
    borrowMarket: [],
    supplyMarket: [],
    latestBlockNumber: '',
    decimals: {},
    assetList: [],
    totalLiquidity: '0',
    totalSupplyBalance: '0',
    totalBorrowBalance: '0',
    totalBorrowLimit: '0',
    pendingInfo: {
      type: '',
      status: false,
      amount: 0,
      symbol: ''
    },
    withSTRK: true,
    markets: []
  }
};

const application = {
  currentNetworkId: 0,
  currentChainId: CHAIN_IDS[localStorage.getItem('network') || 0]
};

export const initialState = {
  auth,
  account,
  application
};
