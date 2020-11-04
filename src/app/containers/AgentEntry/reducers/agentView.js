import { combineReducers } from 'redux';

import filesReducer from 'containers/CaseEntry/reducers/files';

import {
  HIDE_AGENT_MODAL,
  RESET_AGENT_VIEW,
  SHOW_AGENT_MODAL,
} from '../constants';

const content = (state = '', action) => {
  switch (action.type) {
    case RESET_AGENT_VIEW:
      return '';
    default:
      return state;
  }
};

const show = (state = false, action) => {
  switch (action.type) {
    case HIDE_AGENT_MODAL:
    case RESET_AGENT_VIEW:
      return false;
    case SHOW_AGENT_MODAL:
      return true;
    default:
      return state;
  }
};

const agentViewReducer = combineReducers({
  attachments: filesReducer,
  content,
  show,
});
export default agentViewReducer;
