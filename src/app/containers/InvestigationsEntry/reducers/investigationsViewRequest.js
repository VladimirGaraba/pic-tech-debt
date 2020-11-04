import { combineReducers } from 'redux';

import {
  RESET_INVESTIGATIONS_VIEW_REQUEST,
  UPDATE_INVESTIGATIONS_VIEW_REQUEST,
} from '../constants';

const content = (state = '', action) => {
  switch (action.type) {
    case RESET_INVESTIGATIONS_VIEW_REQUEST:
      return '';
    case UPDATE_INVESTIGATIONS_VIEW_REQUEST:
      return action.content;
    default:
      return state;
  }
};

const investigationsViewRequestReducer = combineReducers({
  content,
});
export default investigationsViewRequestReducer;
