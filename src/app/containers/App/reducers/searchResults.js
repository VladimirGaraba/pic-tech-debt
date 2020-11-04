/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "_rev", "_attachments"] }]*/

import { combineReducers } from 'redux';

import {
  LOGOUT,
  UPDATE_ACTION_BAR_SEARCH_RESULTS,
  UPDATE_CASE_LIST_SEARCH_RESULTS,
  UPDATE_NEW_RECORD_SEARCH_RESULTS,
} from '../constants';

const actionBar = (state = [], action) => {
  switch (action.type) {
    case UPDATE_ACTION_BAR_SEARCH_RESULTS:
      return action.results;
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

const caseList = (state = [], action) => {
  switch (action.type) {
    case UPDATE_CASE_LIST_SEARCH_RESULTS:
      return action.results;
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

const newRecord = (state = [], action) => {
  switch (action.type) {
    case UPDATE_NEW_RECORD_SEARCH_RESULTS:
      return action.results;
    case LOGOUT:
      return [];
    default:
      return state;
  }
};

const searchResultsReducer = combineReducers({
  actionBar,
  caseList,
  newRecord,
});
export default searchResultsReducer;
