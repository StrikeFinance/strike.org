import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from 'core/modules/auth/actions';
import { auth, account, application } from 'core/modules';
import { resetReducer } from 'core/modules/reset';

const appReducer = combineReducers({
  auth,
  account,
  application
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  if (action.type === LOGOUT_SUCCESS) {
    finalState = resetReducer(finalState, action);
  }
  return finalState;
}
