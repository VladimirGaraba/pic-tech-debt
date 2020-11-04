import { combineReducers } from 'redux';

import {
  ADD_AGENT_CENTRE_AGENT,
  UPDATE_AGENT_CENTRE_AGENT,
  ADD_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_TEMPLATE_AGENT_CENTRE_AGENT,
} from '../constants';

const name = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      return action.name || state;
    default:
      return state;
  }
};

const url = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      return action.url || state;
    default:
      return state;
  }
};

const quantity = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      return action.quantity || state;
    default:
      return state;
  }
};

const units = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      return action.units || state;
    default:
      return state;
  }
};

const centreAgentRecord = combineReducers({
  name,
  url,
  quantity,
  units,
});

export default centreAgentRecord;
