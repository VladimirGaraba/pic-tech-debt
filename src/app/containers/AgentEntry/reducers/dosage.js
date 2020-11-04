import { combineReducers } from 'redux';

import {
  ADD_AGENT,
  UPDATE_AGENT_QUANTITY,
  UPDATE_QUICK_VIEW_AGENT_QUANTITY,
  UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNITS,
  UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNKNOWN,
  RESET_QUICK_VIEW,
  ADD_TEMPLATE_AGENT,
  UPDATE_TEMPLATE_AGENT_QUANTITY,
} from '../constants';

const quantity = (state = '', action) => {
  switch (action.type) {
    case UPDATE_AGENT_QUANTITY:
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY:
    case ADD_AGENT:
    case UPDATE_TEMPLATE_AGENT_QUANTITY:
    case ADD_TEMPLATE_AGENT:
      return action.quantity;
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNKNOWN:
      return (action.quantityUnknown === true) ? '' : state;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const units = (state = '', action) => {
  switch (action.type) {
    case UPDATE_AGENT_QUANTITY:
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNITS:
    case ADD_AGENT:
    case UPDATE_TEMPLATE_AGENT_QUANTITY:
    case ADD_TEMPLATE_AGENT:
      return action.quantityUnits;
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNKNOWN:
      return (action.quantityUnknown === true) ? '' : state;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const unknown = (state = false, action) => {
  switch (action.type) {
    case UPDATE_AGENT_QUANTITY:
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNKNOWN:
    case ADD_AGENT:
    case UPDATE_TEMPLATE_AGENT_QUANTITY:
    case ADD_TEMPLATE_AGENT:
      return action.quantityUnknown;
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY:
    case UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNITS:
    case RESET_QUICK_VIEW:
      return false;
    default:
      return state;
  }
};

const dosageRecord = combineReducers({
  quantity,
  units,
  unknown,
});

export default dosageRecord;
