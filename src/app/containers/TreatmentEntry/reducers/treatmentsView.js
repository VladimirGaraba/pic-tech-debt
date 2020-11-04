import { combineReducers } from 'redux';

import { spi } from 'containers/App/reducers/utils';

import {
  DISPLAY_RECORD,
  DISPLAY_TEMPLATE,
} from 'containers/App/constants';

import {
  ADD_CALL_RECORD,
  ADD_CASE,
  ADD_TEMPLATE,
  EDIT_TEMPLATE,
} from 'containers/CaseEntry/constants';

import {
  RESET_TREATMENTS_VIEW,
  UPDATE_TREATMENTS_VIEW_CONTENT,
  UPDATE_TREATMENTS_VIEW_DISPOSITION,
  UPDATE_TREATMENTS_VIEW_TREATMENTS,
} from '../constants';

const content = (state = '', action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
    case ADD_TEMPLATE:
    case DISPLAY_RECORD:
    case DISPLAY_TEMPLATE:
    case RESET_TREATMENTS_VIEW:
      return '';
    case UPDATE_TREATMENTS_VIEW_CONTENT:
      return action.content;
    default:
      return state;
  }
};

const disposition = (state = '', action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
    case ADD_TEMPLATE:
    case DISPLAY_RECORD:
    case DISPLAY_TEMPLATE:
    case EDIT_TEMPLATE:
    case RESET_TREATMENTS_VIEW:
      return '';
    case UPDATE_TREATMENTS_VIEW_DISPOSITION:
      return action.disposition;
    default:
      return state;
  }
};

const treatmentList = (state = [], action) => {
  switch (action.type) {
    case ADD_CASE:
    case ADD_CALL_RECORD:
    case ADD_TEMPLATE:
    case DISPLAY_RECORD:
    case DISPLAY_TEMPLATE:
    case EDIT_TEMPLATE:
    case RESET_TREATMENTS_VIEW:
      return [];
    case UPDATE_TREATMENTS_VIEW_TREATMENTS:
      return action.treatmentList;
    default:
      return state;
  }
};

const treatmentsViewReducer = combineReducers({
  content,
  disposition,
  spi,
  treatmentList,
});

export default treatmentsViewReducer;
