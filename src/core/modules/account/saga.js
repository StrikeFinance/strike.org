/* eslint-disable no-unused-vars */
import { put, call, fork, all, take } from 'redux-saga/effects';

import {
  GET_MARKET_HISTORY_REQUEST,
  GET_GOVERNANCE_STRIKE_REQUEST,
  accountActionCreators
} from 'core/modules/account/actions';

import { restService } from 'utilities';

export function* asyncGetMarketHistoryRequest({ payload, resolve, reject }) {
  const { asset, type } = payload;

  try {
    const response = yield call(restService, {
      api: `/market_history/graph?asset=${asset}&type=${type}`,
      method: 'GET',
      params: {}
    });
    if (response.status === 200) {
      resolve(response.data);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncGetGovernanceStrikeRequest({ payload, resolve, reject }) {
  try {
    const response = yield call(restService, {
      api: `/governance/strike`,
      method: 'GET',
      params: {}
    });
    if (response.status === 200) {
      resolve(response.data);
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchGetMarketHistoryRequest() {
  while (true) {
    const action = yield take(GET_MARKET_HISTORY_REQUEST);
    yield* asyncGetMarketHistoryRequest(action);
  }
}

export function* watchGetGovernanceStrikeRequest() {
  while (true) {
    const action = yield take(GET_GOVERNANCE_STRIKE_REQUEST);
    yield* asyncGetGovernanceStrikeRequest(action);
  }
}

export default function*() {
  yield all([
    fork(watchGetMarketHistoryRequest),
    fork(watchGetGovernanceStrikeRequest)
  ]);
}
