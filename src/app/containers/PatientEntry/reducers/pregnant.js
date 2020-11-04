import { combineReducers } from 'redux';

import {
  UPDATE_PATIENT_PREGNANT_LACTATING,
  UPDATE_PATIENT_PREGNANT_STATUS,
  UPDATE_PATIENT_PREGNANT_TRIMESTER,
  UPDATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_LACTATING,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_STATUS,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER,
  UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN,
} from '../constants';

const lactating = (state = 'unknown', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_PREGNANT_LACTATING:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_LACTATING:
      return action.pregnantLactating;
    default:
      return state;
  }
};

const status = (state = 'unknown', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_PREGNANT_STATUS:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_STATUS:
      return action.pregnantStatus;
    default:
      return state;
  }
};

const trimester = (state = 'unknown', action) => {
  switch (action.type) {
    case UPDATE_PATIENT_PREGNANT_TRIMESTER:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER:
      return action.pregnantTrimester;
    default:
      return state;
  }
};

const trimesterUnknown = (state = null, action) => {
  switch (action.type) {
    case UPDATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN:
    case UPDATE_TEMPLATE_PATIENT_PREGNANT_TRIMESTER_UNKNOWN:
      return action.pregnantTrimesterUnknown;
    default:
      return state;
  }
};

const pregnantReducer = combineReducers({
  lactating,
  status,
  trimester,
  trimesterUnknown,
});
export default pregnantReducer;
