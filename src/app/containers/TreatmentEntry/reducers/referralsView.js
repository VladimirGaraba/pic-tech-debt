import { combineReducers } from 'redux';

import {
  RESET_REFERRALS_VIEW,
  UPDATE_REFERRALS_VIEW_REFEREE,
  UPDATE_REFERRALS_VIEW_REFEREE_SITE,
  UPDATE_REFERRALS_VIEW_SPECIALTY,
} from '../constants';

const referee = (state = '', action) => {
  switch (action.type) {
    case UPDATE_REFERRALS_VIEW_REFEREE:
      return action.referee;
    case RESET_REFERRALS_VIEW:
      return '';
    default:
      return state;
  }
};

const specialty = (state = '', action) => {
  switch (action.type) {
    case UPDATE_REFERRALS_VIEW_SPECIALTY:
      return action.specialty;
    case RESET_REFERRALS_VIEW:
      return '';
    default:
      return state;
  }
};

const refereeSite = (state = '', action) => {
  switch (action.type) {
    case UPDATE_REFERRALS_VIEW_REFEREE_SITE:
      return action.refereeSite;
    case RESET_REFERRALS_VIEW:
      return '';
    default:
      return state;
  }
};

const referralsViewReducer = combineReducers({
  referee,
  specialty,
  refereeSite,
});

export default referralsViewReducer;
