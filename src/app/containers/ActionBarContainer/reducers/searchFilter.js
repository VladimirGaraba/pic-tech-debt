import { combineReducers } from 'redux';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
} from 'containers/CaseEntry/constants';

import {
  TOGGLE_NEW_CALL_MODAL,
  UPDATE_NEW_CALL_MODAL_CALLER_LOCATION,
  UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION,
  UPDATE_NEW_CALL_MODAL_CENTRE_NAME,
  UPDATE_NEW_CALL_MODAL_FILTER,
  UPDATE_NEW_CALL_MODAL_ID,
  UPDATE_NEW_CALL_MODAL_NAME,
  UPDATE_NEW_CALL_MODAL_POSTCODE,
  UPDATE_NEW_CALL_MODAL_SELECTED,
  UPDATE_NEW_CALL_MODAL_SEX,
  UPDATE_NEW_CALL_MODAL_TIME,
} from '../constants';

const callerLocation = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_CALLER_LOCATION:
      return action.callerLocation;
    default:
      return state;
  }
};

const callerOrganisation = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_CALLER_ORGANISATION:
      return action.callerOrganisation;
    default:
      return state;
  }
};

const centreName = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_CENTRE_NAME:
      return action.centreName;
    default:
      return state;
  }
};

const filter = (state = 'all', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return 'all';
    case UPDATE_NEW_CALL_MODAL_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const naturalId = (state = '', action) => {
  switch (action.type) {
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_ID:
      return action.naturalId;
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_NAME:
      return action.name;
    default:
      return state;
  }
};

const postcode = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_POSTCODE:
      return action.postcode;
    default:
      return state;
  }
};

const selected = (state = null, action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return null;
    case UPDATE_NEW_CALL_MODAL_SELECTED:
      return action.selected;
    default:
      return state;
  }
};

const sex = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_SEX:
      return action.sex;
    default:
      return state;
  }
};

const show = (state = false, action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
      return false;
    case TOGGLE_NEW_CALL_MODAL:
      return !state;
    default:
      return state;
  }
};

const time = (state = '', action) => {
  switch (action.type) {
    case ADD_CALL_RECORD:
    case ADD_CASE:
    case TOGGLE_NEW_CALL_MODAL:
      return '';
    case UPDATE_NEW_CALL_MODAL_TIME:
      return action.time;
    default:
      return state;
  }
};

const searchFilterReducer = combineReducers({
  callerLocation,
  callerOrganisation,
  centreName,
  filter,
  naturalId,
  name,
  postcode,
  selected,
  sex,
  show,
  time,
});
export default searchFilterReducer;
