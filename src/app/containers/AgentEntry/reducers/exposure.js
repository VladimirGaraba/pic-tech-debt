import { combineReducers } from 'redux';

import {
  ADD_AGENT,
  UPDATE_AGENT_DURATION,
  UPDATE_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_AGENT_TIME_OF_EXPOSURE,
  UPDATE_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_AGENT_TYPE_OF_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_DURATION,
  UPDATE_QUICK_VIEW_AGENT_DURATION_UNITS,
  UPDATE_QUICK_VIEW_AGENT_DURATION_UNKNOWN,
  UPDATE_QUICK_VIEW_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_TIME_OF_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_QUICK_VIEW_AGENT_TYPE_OF_EXPOSURE,
  RESET_QUICK_VIEW,
  ADD_TEMPLATE_AGENT,
  UPDATE_TEMPLATE_AGENT_DURATION,
  UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE,
} from '../constants';

const duration = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT:
    case UPDATE_AGENT_DURATION:
    case UPDATE_QUICK_VIEW_AGENT_DURATION:
    case ADD_TEMPLATE_AGENT:
    case UPDATE_TEMPLATE_AGENT_DURATION:
      return action.duration;
    case UPDATE_QUICK_VIEW_AGENT_DURATION_UNKNOWN:
      return (action.durationUnknown === true) ? '' : state;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const durationUnits = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT:
    case UPDATE_AGENT_DURATION:
    case UPDATE_QUICK_VIEW_AGENT_DURATION_UNITS:
    case ADD_TEMPLATE_AGENT:
    case UPDATE_TEMPLATE_AGENT_DURATION:
      return action.durationUnits;
    case UPDATE_QUICK_VIEW_AGENT_DURATION_UNKNOWN:
      return (action.durationUnknown === true) ? '' : state;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const durationUnknown = (state = false, action) => {
  switch (action.type) {
    case ADD_AGENT:
    case UPDATE_AGENT_DURATION:
    case UPDATE_QUICK_VIEW_AGENT_DURATION_UNKNOWN:
    case ADD_TEMPLATE_AGENT:
    case UPDATE_TEMPLATE_AGENT_DURATION:
      return action.durationUnknown;
    case UPDATE_QUICK_VIEW_AGENT_DURATION:
    case UPDATE_QUICK_VIEW_AGENT_DURATION_UNITS:
    case RESET_QUICK_VIEW:
      return false;
    default:
      return state;
  }
};

const route = (state = [], action) => {
  switch (action.type) {
    case ADD_AGENT:
    case UPDATE_AGENT_ROUTE_OF_EXPOSURE:
    case UPDATE_QUICK_VIEW_AGENT_ROUTE_OF_EXPOSURE:
    case ADD_TEMPLATE_AGENT:
    case UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE:
      return action.routeOfExposure;
    case RESET_QUICK_VIEW:
      return [];
    default:
      return state;
  }
};

const timestamp = (state = '', action) => {
  switch (action.type) {
    case UPDATE_AGENT_TIME_OF_EXPOSURE:
    case UPDATE_QUICK_VIEW_AGENT_TIME_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE:
      return action.timeOfExposure;
    case ADD_AGENT:
    case ADD_TEMPLATE_AGENT:
      return action.timestamp;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const timeSince = (state = '', action) => {
  switch (action.type) {
    case UPDATE_AGENT_TIME_SINCE_EXPOSURE:
    case UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE:
      return action.timeSinceExposure;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const timeSinceUnits = (state = '', action) => {
  switch (action.type) {
    case UPDATE_AGENT_TIME_SINCE_EXPOSURE_UNITS:
    case UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE_UNITS:
    case UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS:
      return action.timeSinceExposureUnits;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const type = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT:
    case UPDATE_AGENT_TYPE_OF_EXPOSURE:
    case UPDATE_QUICK_VIEW_AGENT_TYPE_OF_EXPOSURE:
    case ADD_TEMPLATE_AGENT:
    case UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE:
      return action.typeOfExposure;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const exposureRecord = combineReducers({
  duration,
  durationUnits,
  durationUnknown,
  route,
  timeSince,
  timeSinceUnits,
  timestamp,
  type,
});

export default exposureRecord;
