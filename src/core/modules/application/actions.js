import { createAction } from 'redux-actions';

/**
 * Action Types
 */
export const UPDATE_NETWORK_ID = '@application/updateNetworkId';

/**
 * Action Creators
 */
export const applicationActionCreators = {
  updateNetworkId: createAction(UPDATE_NETWORK_ID)
};
