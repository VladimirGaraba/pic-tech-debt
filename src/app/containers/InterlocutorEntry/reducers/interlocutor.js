import { combineReducers } from 'redux';
import aes256 from 'aes256';
import _isEmpty from 'lodash/isEmpty';

import locationReducer from 'containers/CaseEntry/reducers/location';

import {
  UPDATE_INTERLOCUTOR_CATEGORY,
  UPDATE_INTERLOCUTOR_CONTACT_DETAIL,
  UPDATE_INTERLOCUTOR_NAME,
} from '../constants';

import { createFilteredReducer } from '../../../utils/helpers';

const category = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

const contact = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_CONTACT_DETAIL:
      return action.contact;
    default:
      return state;
  }
};

const name = (state = null, action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_NAME:
    default:
      return null;
  }
};

const nameEnc = (state = '', action) => {
  switch (action.type) {
    case UPDATE_INTERLOCUTOR_NAME:
      return !_isEmpty(action.name) ? aes256.encrypt(action.appKey.key, action.name) : '';
    default:
      return state;
  }
};

const interlocutorReducer = combineReducers({
  category,
  contact,
  nameEnc,
  organisation: createFilteredReducer(locationReducer, (action) => action.type && action.type.match(/INTERLOCUTOR/)),
});
export default interlocutorReducer;
