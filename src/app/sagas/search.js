import { delay } from 'redux-saga';
import { call, cancel, fork, put, take, select } from 'redux-saga/effects';

import {
  BATCH_INSERT_DOCUMENT,
  EXECUTE_SEARCH,
} from 'containers/App/constants';

import {
  updateActionBarSearchResults,
  updateCaseListSearchResults,
  updateNewRecordSearchResults,
} from 'containers/App/actions';

import { selectCases, selectVars, makeSelectJWTClaims } from 'containers/App/selectors';

import { buildSource } from 'utils/helpers';

export function* searchBatchInsertFlow() {
  let task;

  while (true) { // eslint-disable-line no-constant-condition
    yield take(BATCH_INSERT_DOCUMENT);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleDoSearch);
  }
}

export function* searchPollUpdateFlow() {
  let task;

  while (true) { // eslint-disable-line no-constant-condition
    yield call(delay, 60000);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleDoSearch, 0);
  }
}

function* searchFlow() {
  while (true) { // eslint-disable-line no-constant-condition
    const request = yield take(EXECUTE_SEARCH);
    const { context, criteria } = request;

    yield fork(doSearch, context, criteria);
  }
}

function* handleDoSearch(ms = 1000) {
  yield call(delay, ms);
  const vars = yield select(selectVars);
  yield fork(doSearch, 'case_list', vars.caseListSearch);
}

function* doSearch(context, criteria) {
  const cases = yield select(selectCases);
  const jwtClaims = yield select(makeSelectJWTClaims());
  const results = yield call(buildSource, criteria, cases, jwtClaims.site_id);

  switch (context) {
    case 'case_list':
      yield put(updateCaseListSearchResults(results));
      break;
    case 'action_bar':
      yield put(updateActionBarSearchResults(results));
      break;
    case 'new_record':
      yield put(updateNewRecordSearchResults(results));
      break;
    default:
      break;
  }
}

export default searchFlow;
