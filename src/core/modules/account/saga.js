/* eslint-disable no-unused-vars */
import { put, call, fork, all, take } from 'redux-saga/effects';

import {
  GET_MARKET_HISTORY_REQUEST,
  GET_GOVERNANCE_STRIKE_REQUEST,
  GET_COMMON,
  accountActionCreators
} from 'core/modules/account/actions';

import { restService } from 'utilities';
import {
  GET_GOVERNANCE_REQUEST,
  GET_GOVERNANCE_STRIKE_PARAM_REQUEST,
  GET_INTERATE_MODEL,
  GET_PROPOSAL_BY_ID_REQUEST,
  GET_VOTERS_REQUEST
} from './actions';

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
  let url;
  if (typeof payload.offset === 'number' && payload.limit) {
    url = `/governance/strike?offset=${payload.offset}&limit=${payload.limit}`;
  } else {
    url = `/governance/strike`;
  }
  try {
    const response = yield call(restService, {
      api: url,
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
export function* asyncGetGovernanceRequest({ payload, resolve, reject }) {
  try {
    const response = yield call(restService, {
      api: `/proposals?limit=${payload.limit}&offset=${payload.offset}&filter=${payload.filter}`,
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

export function* asyncGetProposalByIdRequest({ payload, resolve, reject }) {
  const { id } = payload;
  try {
    const response = yield call(restService, {
      api: `/proposals/${id}`,
      method: 'GET',
      params: {}
    });
    if (response.status === 200) {
      resolve(response.data);
    } else {
      reject(response);
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchasyncGetGovernanceRequest() {
  while (true) {
    const action = yield take(GET_GOVERNANCE_REQUEST);
    yield* asyncGetGovernanceRequest(action);
  }
}
export function* watchGetMarketHistoryRequest() {
  while (true) {
    const action = yield take(GET_MARKET_HISTORY_REQUEST);
    yield* asyncGetMarketHistoryRequest(action);
  }
}

export function* watchGetProposalByIdRequest() {
  while (true) {
    const action = yield take(GET_PROPOSAL_BY_ID_REQUEST);
    yield* asyncGetProposalByIdRequest(action);
  }
}

export function* watchGetGovernanceStrikeRequest() {
  while (true) {
    const action = yield take(GET_GOVERNANCE_STRIKE_REQUEST);
    yield* asyncGetGovernanceStrikeRequest(action);
  }
}
export function* watchGetGovernanceStrikeWithParamRequest() {
  while (true) {
    const action = yield take(GET_GOVERNANCE_STRIKE_PARAM_REQUEST);
    yield* asyncGetGovernanceStrikeRequest(action);
  }
}

export function* asyncGetCommon({ payload, resolve, reject }) {
  try {
    const response = yield call(restService, {
      api: `/common/decimals`,
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

export function* watchGetDecimalRequest() {
  while (true) {
    const action = yield take(GET_COMMON);
    yield* asyncGetCommon(action);
  }
}

export function* asyncGetInterateModel({ payload, resolve, reject }) {
  try {
    const response = yield call(restService, {
      api: `/common/interate_model/${payload.asset}`,
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

export function* asyncGetVotersRequest({ payload, resolve, reject }) {
  const { limit, filter, id } = payload;
  try {
    const response = yield call(restService, {
      api: `/voters/${id}?limit=${limit || 3}&filter=${filter}`,
      method: 'GET',
      params: {}
    });
    if (response.status === 200) {
      resolve(response.data);
    } else {
      reject(response);
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchGetInterateModelRequest() {
  while (true) {
    const action = yield take(GET_INTERATE_MODEL);
    yield* asyncGetInterateModel(action);
  }
}

export function* watchGetVotersRequest() {
  while (true) {
    const action = yield take(GET_VOTERS_REQUEST);
    yield* asyncGetVotersRequest(action);
  }
}

export function* asyncGetFaucetRequest({ payload, resolve, reject }) {
  const { address, asset, amountType } = payload;

  try {
    const response = yield call(restService, {
      api: `/faucet`,
      method: 'POST',
      params: {
        address,
        asset,
        amountType
      }
    });
    if (response.status === 200) {
      yield put(accountActionCreators.getFromFaucetSuccess());
      resolve(response.data);
    } else {
      reject(response);
    }
  } catch (e) {
    reject(e);
  }
}

export default function*() {
  yield all([
    fork(watchGetMarketHistoryRequest),
    fork(watchGetGovernanceStrikeRequest),
    fork(watchGetDecimalRequest),
    fork(watchGetInterateModelRequest),
    fork(watchGetProposalByIdRequest),
    fork(watchasyncGetGovernanceRequest),
    fork(watchGetGovernanceStrikeWithParamRequest),
    fork(watchGetVotersRequest)
  ]);
}
