/* eslint-disable no-underscore-dangle */

// Persisent session data for the app
import { call, put, select, take } from 'redux-saga/effects';

import { makeSelectJWTClaims } from 'containers/App/selectors';

import {
  SET_AUTH,
  UPDATE_CASE_LIST_SEARCH_RESULTS,
  UPDATE_TOXICOLOGY_SOURCE,
} from 'containers/App/constants';

import {
  displayRecord,
  setTab,
  updateToxicologySource,
} from 'containers/App/actions';

// this keeps the preferred toxicology source
//
function* persistSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take([UPDATE_TOXICOLOGY_SOURCE, SET_AUTH]);
    switch (action.type) {
      case UPDATE_TOXICOLOGY_SOURCE: {
        localStorage.setItem('toxicologySource', action.toxicologySource);
        break;
      }
      case SET_AUTH: {
        if (action.newAuthState) {
          const jwtClaims = yield select(makeSelectJWTClaims());
          const userId = jwtClaims.sub;
          const userData = JSON.parse(localStorage.getItem('userData')) || {};
          if (userId in userData) {
            if ('currentRecordId' in userData[userId]) {
              yield take(UPDATE_CASE_LIST_SEARCH_RESULTS);
              yield put(displayRecord(userData[userId].currentRecordId));
              yield put(setTab(0));
            }
          }
          if (localStorage.getItem('toxicologySource')) {
            yield put(updateToxicologySource(localStorage.getItem('toxicologySource')));
          }
        }
        break;
      }
      default:
    }
  }
}

function* persistFlow() {
  yield call(persistSaga);
}
export default persistFlow;
