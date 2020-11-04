// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`authorize` and `logout`) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

import { call, put, spawn } from 'redux-saga/effects';

import { loginFlow, logoutFlow, refreshFlow, registerFlow } from 'sagas/auth';
import pouchFlow from 'sagas/pouch';
import persistFlow from 'sagas/persist';
import { reencryptFlow } from 'sagas/reencrypt';
import searchFlow, { searchBatchInsertFlow, searchPollUpdateFlow } from 'sagas/search';
import serviceWorkerFlow from 'sagas/serviceWorker';

import {
  REQUEST_ERROR,
} from 'containers/App/constants';

// The root saga is what we actually send to Redux's middleware. In here we fork
// each saga so that they are all "active" and listening.
// Sagas are fired once at the start of an app and can be thought of as processes running
// in the background, watching actions dispatched to the store.
const sagas = [
  refreshFlow,
  persistFlow,
  pouchFlow,
  searchBatchInsertFlow,
  searchFlow,
  searchPollUpdateFlow,
  serviceWorkerFlow,
  reencryptFlow,
  registerFlow,
  logoutFlow,
  loginFlow, // Last to ensure set_auth triggers after other sagas have loaded
];

export default function* root() {
  yield sagas.map((saga) => spawn(function* () { // eslint-disable-line func-names
    let isSyncError = false;
    const clearSyncError = () => { isSyncError = false; };
    while (!isSyncError) {
      isSyncError = true;
      try {
        setTimeout(clearSyncError);
        yield call(saga);
        break;
      } catch (e) {
        if (isSyncError) {
          throw new Error(`${saga.name} was terminated because it threw an exception on startup.${e.stack}`);
        }
        yield put({ type: REQUEST_ERROR, error: e.message });
      }
    }
  }));
}
