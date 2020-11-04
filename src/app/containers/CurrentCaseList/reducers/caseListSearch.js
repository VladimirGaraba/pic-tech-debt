import { combineReducers } from 'redux';

import {
  UPDATE_CASE_LIST_SEARCH_CALLER_LOCATION,
  UPDATE_CASE_LIST_SEARCH_CALLER_ORGANISATION,
  UPDATE_CASE_LIST_SEARCH_CENTRE_NAME,
  UPDATE_CASE_LIST_SEARCH_FILTER,
  UPDATE_CASE_LIST_SEARCH_ID,
  UPDATE_CASE_LIST_SEARCH_NAME,
  UPDATE_CASE_LIST_SEARCH_POSTCODE,
  UPDATE_CASE_LIST_SEARCH_SEX,
  UPDATE_CASE_LIST_SEARCH_TIME,
} from '../constants';

const callerLocation = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_CALLER_LOCATION:
      return action.callerLocation;
    default:
      return state;
  }
};

const callerOrganisation = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_CALLER_ORGANISATION:
      return action.callerOrganisation;
    default:
      return state;
  }
};

const centreName = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_CENTRE_NAME:
      return action.centreName;
    default:
      return state;
  }
};

const filter = (state = 'open', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_FILTER:
      return action.filter;
    default:
      return state;
  }
};

const naturalId = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_ID:
      return action.naturalId;
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_NAME:
      return action.name;
    default:
      return state;
  }
};

const postcode = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_POSTCODE:
      return action.postcode;
    default:
      return state;
  }
};

const sex = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_SEX:
      return action.sex;
    default:
      return state;
  }
};

const time = (state = '', action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_TIME:
      return action.time;
    default:
      return state;
  }
};

const caseListSearchReducer = combineReducers({
  callerLocation,
  callerOrganisation,
  centreName,
  filter,
  naturalId,
  name,
  postcode,
  sex,
  time,
});
export default caseListSearchReducer;
