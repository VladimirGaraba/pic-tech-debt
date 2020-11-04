import { combineReducers } from 'redux';

import filesReducer from 'containers/CaseEntry/reducers/files';

import {
  HIDE_INVESTIGATIONS_VIEW_RESULT_MODAL,
  RESET_INVESTIGATIONS_VIEW_RESULT,
  SHOW_INVESTIGATIONS_VIEW_RESULT_MODAL,
  UPDATE_INVESTIGATIONS_VIEW_RESULT_DESCRIPTION,
  UPDATE_INVESTIGATIONS_VIEW_RESULT_NOTES,
} from '../constants';

const content = (state = '', action) => {
  switch (action.type) {
    case RESET_INVESTIGATIONS_VIEW_RESULT:
      return '';
    case UPDATE_INVESTIGATIONS_VIEW_RESULT_NOTES:
      return action.content;
    default:
      return state;
  }
};

const description = (state = '', action) => {
  switch (action.type) {
    case RESET_INVESTIGATIONS_VIEW_RESULT:
      return '';
    case UPDATE_INVESTIGATIONS_VIEW_RESULT_DESCRIPTION:
      return action.description;
    default:
      return state;
  }
};

const id = (state = '', action) => {
  switch (action.type) {
    case RESET_INVESTIGATIONS_VIEW_RESULT:
      return '';
    case SHOW_INVESTIGATIONS_VIEW_RESULT_MODAL:
      return action.requestIx;
    default:
      return state;
  }
};

const toggle = (state = false, action) => {
  switch (action.type) {
    case HIDE_INVESTIGATIONS_VIEW_RESULT_MODAL:
    case RESET_INVESTIGATIONS_VIEW_RESULT:
      return false;
    case SHOW_INVESTIGATIONS_VIEW_RESULT_MODAL:
      return true;
    default:
      return state;
  }
};

const investigationsViewResultReducer = combineReducers({
  attachments: filesReducer,
  content,
  description,
  show: toggle,
  requestIx: id,
});
export default investigationsViewResultReducer;
