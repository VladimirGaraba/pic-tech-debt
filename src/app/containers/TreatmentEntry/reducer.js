import { combineReducers } from 'redux';
import { noteRefs, spi, timestamp } from 'containers/App/reducers/utils';

import {
  UPDATE_TREATMENTS,
  UPDATE_TEMPLATE_TREATMENTS,
} from './constants';

const disposition = (state = '', action) => {
  switch (action.type) {
    case UPDATE_TREATMENTS:
    case UPDATE_TEMPLATE_TREATMENTS:
      return action.disposition;
    default:
      return state;
  }
};

const descriptors = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TREATMENTS:
    case UPDATE_TEMPLATE_TREATMENTS:
      return action.treatments;
    default:
      return state;
  }
};

const treatmentRecord = combineReducers({
  disposition,
  notes: noteRefs,
  spi,
  timestamp,
  treatments: descriptors,
});

const treatmentsReducer = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case UPDATE_TREATMENTS:
    case UPDATE_TEMPLATE_TREATMENTS: {
      const treatment = treatmentRecord(undefined, action);
      newState.push(treatment);
      return newState;
    }
    default:
      return state;
  }
};

export default treatmentsReducer;
