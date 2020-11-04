import { call, take } from 'redux-saga/effects';
import { checkForUpdates } from 'utils/helpers';

import {
  DISPLAY_RECORD,
} from 'containers/App/constants';

import {
  END_CALL_RECORD,
} from 'containers/CaseEntry/constants';

function* serviceWorkerSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take([DISPLAY_RECORD, END_CALL_RECORD]);
    switch (action.type) {
      case DISPLAY_RECORD:
      case END_CALL_RECORD: {
        checkForUpdates();
        break;
      }
      default:
    }
  }
}

function* serviceWorkerFlow() {
  yield call(serviceWorkerSaga);
}
export default serviceWorkerFlow;
