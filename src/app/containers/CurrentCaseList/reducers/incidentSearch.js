import { combineReducers } from 'redux';

import _isEmpty from 'lodash/isEmpty';

import {
  ADD_INCIDENT,
  LINK_CASE_INCIDENT,
} from 'containers/CaseEntry/constants';

import {
  TOGGLE_INCIDENT_MODAL,
  UPDATE_INCIDENT_MODAL_NAME,
  UPDATE_INCIDENT_MODAL_SELECTED,
} from '../constants';

const show = (state = false, action) => {
  switch (action.type) {
    case ADD_INCIDENT:
    case LINK_CASE_INCIDENT:
      return false;
    case TOGGLE_INCIDENT_MODAL:
      return !state;
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case ADD_INCIDENT:
    case LINK_CASE_INCIDENT:
    case TOGGLE_INCIDENT_MODAL:
      return '';
    case UPDATE_INCIDENT_MODAL_NAME:
      return action.name;
    default:
      return state;
  }
};

const caseId = (state = '', action) => {
  switch (action.type) {
    case ADD_INCIDENT:
    case LINK_CASE_INCIDENT:
    case TOGGLE_INCIDENT_MODAL:
      if (!_isEmpty(action.linkCaseId)) {
        return action.linkCaseId;
      }
      return '';
    default:
      return state;
  }
};

const selected = (state = '', action) => {
  switch (action.type) {
    case LINK_CASE_INCIDENT:
    case TOGGLE_INCIDENT_MODAL:
      return '';
    case UPDATE_INCIDENT_MODAL_SELECTED:
      return action.selectedId;
    default:
      return state;
  }
};

const incidentSearchFilterReducer = combineReducers({
  show,
  name,
  caseId,
  selected,
});
export default incidentSearchFilterReducer;
