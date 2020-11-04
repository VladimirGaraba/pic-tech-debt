import {
  ADD_AGENT,
  ADD_AGENT_CENTRE_AGENT,
  ADD_TEMPLATE_AGENT,
  ADD_TEMPLATE_AGENT_CENTRE_AGENT,
  DELETE_AGENT,
  DELETE_TEMPLATE_AGENT,
  REMOVE_AGENT_CENTRE_AGENT,
  REMOVE_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_AGENT_CATEGORY,
  UPDATE_AGENT_CENTRE_AGENT,
  UPDATE_AGENT_DURATION,
  UPDATE_AGENT_INTENDED_USE_GIVEN,
  UPDATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  UPDATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  UPDATE_AGENT_QUANTITY,
  UPDATE_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_AGENT_TIME_OF_EXPOSURE,
  UPDATE_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_AGENT_TYPE_OF_EXPOSURE,
  UPDATE_AGENT_USE_TYPE,
  UPDATE_TEMPLATE_AGENT_CATEGORY,
  UPDATE_TEMPLATE_AGENT_CENTRE_AGENT,
  UPDATE_TEMPLATE_AGENT_DURATION,
  UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN,
  UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  UPDATE_TEMPLATE_AGENT_QUANTITY,
  UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE,
  UPDATE_TEMPLATE_AGENT_USE_TYPE,
} from 'containers/AgentEntry/constants';

const updateValue = (state, old, value) => {
  if (state) {
    return [state[0], value];
  }
  return [old, value];
};

const centreAgentRecord = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
      newState.name = updateValue(newState.name, '', action.name);
      newState.quantity = updateValue(newState.quantity, '', action.quantity);
      newState.units = updateValue(newState.units, '', action.units);
      delete newState.deleted;
      return newState;
    case UPDATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      newState.name = updateValue(newState.name, action.name, action.name);
      newState.quantity = updateValue(newState.quantity, action.quantity, action.quantity);
      newState.units = updateValue(newState.units, action.units, action.units);
      return newState;
    case REMOVE_AGENT_CENTRE_AGENT:
    case REMOVE_TEMPLATE_AGENT_CENTRE_AGENT:
      newState.name = updateValue(newState.name, action.name, action.name);
      newState.deleted = true;
      return newState;
    default:
      return state;
  }
};

const agentRecord = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_AGENT:
    case ADD_TEMPLATE_AGENT:
      newState.id = updateValue(newState.id, '', action.agentId);
      newState.interlocutorAgentName = updateValue(newState.interlocutorAgentName, '', action.interlocutorAgentName);
      newState.quantity = updateValue(newState.quantity, '', action.quantity);
      newState.quantityUnits = updateValue(newState.quantityUnits, '', action.quantityUnits);
      newState.quantityUnknown = updateValue(newState.quantityUnknown, false, action.quantityUnknown);
      newState.timestamp = updateValue(newState.timestamp, '', action.timestamp);
      newState.duration = updateValue(newState.duration, '', action.duration);
      newState.durationUnits = updateValue(newState.durationUnits, '', action.durationUnits);
      newState.durationUnknown = updateValue(newState.durationUnknown, false, action.durationUnknown);
      newState.typeOfExposure = updateValue(newState.typeOfExposure, '', action.typeOfExposure);
      newState.routeOfExposure = updateValue(newState.routeOfExposure, '', action.routeOfExposure);
      return newState;
    case UPDATE_AGENT_INTERLOCUTOR_AGENT_NAME:
    case UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME:
      newState.interlocutorAgentName = updateValue(newState.interlocutorAgentName, '', action.interlocutorAgentName);
      return newState;
    case UPDATE_AGENT_CATEGORY:
    case UPDATE_TEMPLATE_AGENT_CATEGORY:
      newState.category = updateValue(newState.category, action.old, action.category);
      return newState;
    case UPDATE_AGENT_USE_TYPE:
    case UPDATE_TEMPLATE_AGENT_USE_TYPE:
      newState.useType = updateValue(newState.useType, action.old, action.useType);
      return newState;
    case UPDATE_AGENT_INTENDED_USE_GIVEN:
    case UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN:
      newState.intendedUseGiven = updateValue(newState.intendedUseGiven, action.old, action.intendedUseGiven);
      return newState;
    case UPDATE_AGENT_IS_PATIENTS_OWN_MEDICATION:
    case UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION:
      newState.isPatientsOwnMedication = updateValue(newState.isPatientsOwnMedication, action.old, action.isPatientsOwnMedication);
      return newState;
    case UPDATE_AGENT_QUANTITY:
    case UPDATE_TEMPLATE_AGENT_QUANTITY:
      newState.quantity = updateValue(newState.quantity, action.oldQuantity, action.quantity);
      newState.quantityUnits = updateValue(newState.quantityUnits, action.oldQuantityUnits, action.quantityUnits);
      newState.quantityUnknown = updateValue(newState.quantityUnknown, action.oldQuantityUnknown, action.quantityUnknown);
      return newState;
    case UPDATE_AGENT_TIME_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE:
      newState.timestamp = updateValue(newState.timestamp, action.oldTimeOfExposure, action.timeOfExposure);
      return newState;
    case UPDATE_AGENT_TIME_SINCE_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE:
      newState.timeSinceExposure = updateValue(newState.timeSinceExposure, action.old, action.timeSinceExposure);
      return newState;
    case UPDATE_AGENT_TIME_SINCE_EXPOSURE_UNITS:
    case UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS:
      newState.timeSinceExposureUnits = updateValue(newState.timeSinceExposureUnits, action.old, action.timeSinceExposureUnits);
      return newState;
    case UPDATE_AGENT_DURATION:
    case UPDATE_TEMPLATE_AGENT_DURATION:
      newState.duration = updateValue(newState.duration, action.oldDuration, action.duration);
      newState.durationUnits = updateValue(newState.durationUnits, action.oldDurationUnits, action.durationUnits);
      newState.durationUnknown = updateValue(newState.durationUnknown, action.oldDurationUnknown, action.durationUnknown);
      return newState;
    case UPDATE_AGENT_TYPE_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE:
      newState.typeOfExposure = updateValue(newState.typeOfExposure, action.old, action.typeOfExposure);
      return newState;
    case UPDATE_AGENT_ROUTE_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE:
      newState.routeOfExposure = updateValue(newState.routeOfExposure, action.old, action.routeOfExposure);
      return newState;
    case ADD_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
    case REMOVE_AGENT_CENTRE_AGENT:
    case REMOVE_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
      if (typeof (newState.centreAgents) === 'undefined') {
        newState.centreAgents = {};
      }
      newState.centreAgents[action.name] = centreAgentRecord(newState.centreAgents[action.name], action);
      return newState;
    case DELETE_AGENT:
    case DELETE_TEMPLATE_AGENT:
      newState.interlocutorAgentName = action.agentName;
      newState.deleted = true;
      return newState;
    default:
      return state;
  }
};
const agents = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case ADD_AGENT:
      newState[action.agentId] = agentRecord(undefined, action);
      return newState;
    case ADD_AGENT_CENTRE_AGENT:
    case ADD_TEMPLATE_AGENT_CENTRE_AGENT:
    case DELETE_AGENT:
    case DELETE_TEMPLATE_AGENT:
    case REMOVE_AGENT_CENTRE_AGENT:
    case REMOVE_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_CATEGORY:
    case UPDATE_AGENT_CENTRE_AGENT:
    case UPDATE_AGENT_DURATION:
    case UPDATE_AGENT_INTENDED_USE_GIVEN:
    case UPDATE_AGENT_INTERLOCUTOR_AGENT_NAME:
    case UPDATE_AGENT_IS_PATIENTS_OWN_MEDICATION:
    case UPDATE_AGENT_QUANTITY:
    case UPDATE_AGENT_ROUTE_OF_EXPOSURE:
    case UPDATE_AGENT_TIME_OF_EXPOSURE:
    case UPDATE_AGENT_TIME_SINCE_EXPOSURE:
    case UPDATE_AGENT_TIME_SINCE_EXPOSURE_UNITS:
    case UPDATE_AGENT_TYPE_OF_EXPOSURE:
    case UPDATE_AGENT_USE_TYPE:
    case UPDATE_TEMPLATE_AGENT_CATEGORY:
    case UPDATE_TEMPLATE_AGENT_CENTRE_AGENT:
    case UPDATE_TEMPLATE_AGENT_DURATION:
    case UPDATE_TEMPLATE_AGENT_INTENDED_USE_GIVEN:
    case UPDATE_TEMPLATE_AGENT_INTERLOCUTOR_AGENT_NAME:
    case UPDATE_TEMPLATE_AGENT_IS_PATIENTS_OWN_MEDICATION:
    case UPDATE_TEMPLATE_AGENT_QUANTITY:
    case UPDATE_TEMPLATE_AGENT_ROUTE_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_TIME_SINCE_EXPOSURE_UNITS:
    case UPDATE_TEMPLATE_AGENT_TYPE_OF_EXPOSURE:
    case UPDATE_TEMPLATE_AGENT_USE_TYPE:
      newState[action.agentId] = agentRecord(newState[action.agentId], action);
      return newState;
    default:
      return state;
  }
};

export default agents;
