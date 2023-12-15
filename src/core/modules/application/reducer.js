import { UPDATE_NETWORK_ID } from 'core/modules/application/actions';
import { initialState } from 'core/modules/initialState';
import { CHAIN_IDS } from 'connectors';

export default function application(
  state = initialState.application,
  action = {}
) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_NETWORK_ID: {
      const { selectedNetworkId } = payload;
      return {
        ...state,
        currentNetworkId: selectedNetworkId,
        currentChainId: CHAIN_IDS[selectedNetworkId]
      };
    }
    default: {
      return state;
    }
  }
}
