import { combineReducers } from 'redux';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';

import {
  UPDATE_INTERLOCUTOR_MEDIUM,
  UPDATE_INTERLOCUTOR_MEDIUM_DETAIL,
} from '../constants';

const detail = (state = null, action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_MEDIUM_DETAIL:
    default:
      return null;
  }
};

const detailEnc = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_MEDIUM_DETAIL:
      return !_isEmpty(action.detail) ? aes256.encrypt(action.appKey.key, action.detail) : '';
    default:
      return state;
  }
};

const type = (state = 'Phone', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_MEDIUM:
      return action.medium;
    default:
      return state;
  }
};

const mediumReducer = combineReducers({
  detailEnc,
  type,
});
export default mediumReducer;
