import { combineReducers } from 'redux';

import {
  ADD_AGENT,
  ADD_AGENT_CENTRE_AGENT,
  REMOVE_AGENT_CENTRE_AGENT,
  RESET_QUICK_VIEW,
  UPDATE_AGENT_CATEGORY,
  UPDATE_AGENT_CENTRE_AGENT,
  UPDATE_AGENT_EUPCS,
  UPDATE_AGENT_INTENDED_USE_GIVEN,
  UPDATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  UPDATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  UPDATE_AGENT_USE_TYPE,
  UPDATE_QUICK_VIEW_AGENT_NAME,
  ADD_TEMPLATE_AGENT,
  ADD_TEMPLATE_AGENT_CENTRE_AGENT,
  REMOVE_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_TEMPLATE_AGENT_CATEGORY,
  UPDATE_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_TEMPLATE_AGENT_EUPCS,
  UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN,
  UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  UPDATE_TEMPLATE_AGENT_USE_TYPE,
} from '../constants';

import centreAgentReducer from './centreAgent';
import dosageReducer from './dosage';
import exposureReducer from './exposure';

const id = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT:
    case ADD_TEMPLATE_AGENT:
      return action.agentId;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const name = (state = '', action) => {
  switch (action.type) {
    case ADD_AGENT:
    case ADD_TEMPLATE_AGENT:
    case UPDATE_AGENT_INTERLOCUTOR_AGENT_NAME:
    case UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME:
    case UPDATE_QUICK_VIEW_AGENT_NAME:
      return action.interlocutorAgentName;
    case RESET_QUICK_VIEW:
      return '';
    default:
      return state;
  }
};

const category = (state = '', action) => {
  switch (action.type) {
    case RESET_QUICK_VIEW:
      return '';
    case UPDATE_AGENT_CATEGORY:
    case UPDATE_TEMPLATE_AGENT_CATEGORY:
      return action.category;
    default:
      return state;
  }
};

const centreAgents = (state = [], action) => {
  switch (action.type) {
    case ADD_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
      return state.concat(centreAgentReducer(undefined, action));
    case REMOVE_AGENT_CENTRE_AGENT:
    case REMOVE_TEMPLATE_AGENT_CENTRE_AGENT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case RESET_QUICK_VIEW:
      return [];
    case UPDATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      return [
        ...state.slice(0, action.index),
        centreAgentReducer(state[action.index], action),
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
};

const eupcs = (state = '', action) => {
  switch (action.type) {
    case RESET_QUICK_VIEW:
      return '';
    case UPDATE_AGENT_EUPCS:
    case UPDATE_TEMPLATE_AGENT_EUPCS:
      return action.eupcs;
    default:
      return state;
  }
};

const intendedUseGiven = (state = '', action) => {
  switch (action.type) {
    case RESET_QUICK_VIEW:
      return '';
    case UPDATE_AGENT_INTENDED_USE_GIVEN:
    case UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN:
      return action.intendedUseGiven;
    default:
      return state;
  }
};

const isPatientsOwnMedication = (state = false, action) => {
  switch (action.type) {
    case UPDATE_AGENT_IS_PATIENTS_OWN_MEDICATION:
    case UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION:
      return action.isPatientsOwnMedication;
    default:
      return state;
  }
};

const type = (state = [], action) => {
  switch (action.type) {
    case RESET_QUICK_VIEW:
      return [];
    case UPDATE_AGENT_USE_TYPE:
    case UPDATE_TEMPLATE_AGENT_USE_TYPE:
      return action.useType;
    default:
      return state;
  }
};

export const agentRecord = combineReducers({
  id,
  name,
  centreAgents,
  category,
  dosage: dosageReducer,
  exposure: exposureReducer,
  eupcs,
  intendedUseGiven,
  isPatientsOwnMedication,
  type,
});
export default agentRecord;
