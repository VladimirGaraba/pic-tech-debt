import { combineReducers } from 'redux';
import { timestamp } from 'containers/App/reducers/utils';

import {
  UPDATE_REFERRALS,
  UPDATE_TEMPLATE_REFERRALS,
} from '../constants';

const referee = (state = '', action) => {
  switch (action.type) {
    case UPDATE_REFERRALS:
    case UPDATE_TEMPLATE_REFERRALS:
      return action.referee;
    default:
      return state;
  }
};

const specialty = (state = '', action) => {
  switch (action.type) {
    case UPDATE_REFERRALS:
    case UPDATE_TEMPLATE_REFERRALS:
      return action.specialty;
    default:
      return state;
  }
};

const refereeSite = (state = '', action) => {
  switch (action.type) {
    case UPDATE_REFERRALS:
    case UPDATE_TEMPLATE_REFERRALS:
      return action.refereeSite;
    default:
      return state;
  }
};

const referralRecord = combineReducers({
  referee,
  specialty,
  refereeSite,
  timestamp,
});

const referralsReducer = (state = [], action) => {
  switch (action.type) {
    case UPDATE_REFERRALS:
    case UPDATE_TEMPLATE_REFERRALS:
      return state.concat(referralRecord(undefined, action));
    default:
      return state;
  }
};

export default referralsReducer;
