import { combineReducers } from 'redux';

import { timestamp, spi, status } from 'containers/App/reducers/utils';

import historyReducer from './history';

const commType = (state = 'status', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const statusRecordReducer = combineReducers({
  history: historyReducer,
  newState: status,
  spi,
  timestamp,
  type: commType,
});
export default statusRecordReducer;
