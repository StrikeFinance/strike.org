import { createAction } from 'redux-actions';
import { createPromiseAction } from 'core/modules/utils';

/**
 * Action Types
 */
export const SET_SETTING_REQUEST = '@account/SET_SETTING_REQUEST';
export const GET_MARKET_HISTORY_REQUEST = '@account/GET_MARKET_HISTORY_REQUEST';
export const GET_GOVERNANCE_STRIKE_REQUEST =
  '@account/GET_GOVERNANCE_STRIKE_REQUEST';
export const GET_GOVERNANCE_STRIKE_PARAM_REQUEST =
  '@account/GET_GOVERNANCE_STRIKE_PARAM_REQUEST';
export const GET_COMMON = '@account/GET_COMMON';
export const GET_INTERATE_MODEL = '@account/GET_INTERATE_MODEL';
export const GET_GOVERNANCE_REQUEST = '@account/GET_GOVERNANCE_REQUEST';
export const GET_PROPOSAL_BY_ID_REQUEST = '@account/GET_PROPOSAL_BY_ID_REQUEST';

/**
 * Action Creators
 */
export const accountActionCreators = {
  setSetting: createAction(SET_SETTING_REQUEST),
  getMarketHistory: createPromiseAction(GET_MARKET_HISTORY_REQUEST),
  getGovernanceStrike: createPromiseAction(GET_GOVERNANCE_STRIKE_REQUEST),
  getGovernanceStrikeWithParam: createPromiseAction(
    GET_GOVERNANCE_STRIKE_PARAM_REQUEST
  ),
  getDecimals: createPromiseAction(GET_COMMON),
  getInterateModel: createPromiseAction(GET_INTERATE_MODEL),
  getGovernance: createPromiseAction(GET_GOVERNANCE_REQUEST),
  getProposalId: createPromiseAction(GET_PROPOSAL_BY_ID_REQUEST)
};
