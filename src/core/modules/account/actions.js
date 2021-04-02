import { createAction } from 'redux-actions';
import { createPromiseAction } from 'core/modules/utils';

/**
 * Action Types
 */
export const SET_SETTING_REQUEST = '@account/SET_SETTING_REQUEST';
export const GET_MARKET_HISTORY_REQUEST = '@account/GET_MARKET_HISTORY_REQUEST';
export const GET_GOVERNANCE_STRIKE_REQUEST = '@account/GET_GOVERNANCE_STRIKE_REQUEST';

/**
 * Action Creators
 */
export const accountActionCreators = {
  setSetting: createAction(SET_SETTING_REQUEST),
  getMarketHistory: createPromiseAction(GET_MARKET_HISTORY_REQUEST),
  getGovernanceStrike: createPromiseAction(GET_GOVERNANCE_STRIKE_REQUEST)
};
