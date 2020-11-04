import { generateUuid } from 'utils/helpers';

import {
  ADD_AGENT,
  ADD_AGENT_CENTRE_AGENT,
  DELETE_AGENT,
  HIDE_AGENT_MODAL,
  REMOVE_AGENT_CENTRE_AGENT,
  RESET_AGENT_VIEW,
  RESET_QUICK_VIEW,
  SET_AGENT_TAB,
  SHOW_AGENT_MODAL,
  UPDATE_AGENT_CATEGORY,
  UPDATE_AGENT_CENTRE_AGENT,
  UPDATE_AGENT_DURATION,
  UPDATE_AGENT_EUPCS,
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
  UPDATE_QUICK_VIEW_AGENT_DURATION,
  UPDATE_QUICK_VIEW_AGENT_DURATION_UNITS,
  UPDATE_QUICK_VIEW_AGENT_DURATION_UNKNOWN,
  UPDATE_QUICK_VIEW_AGENT_NAME,
  UPDATE_QUICK_VIEW_AGENT_QUANTITY,
  UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNITS,
  UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNKNOWN,
  UPDATE_QUICK_VIEW_AGENT_ROUTE_OF_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_TIME_OF_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE,
  UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  UPDATE_QUICK_VIEW_AGENT_TYPE_OF_EXPOSURE,
} from '../constants';

export const addAgent = (id, interlocutorAgentName = '', quantity = '', quantityUnits = '', quantityUnknown = false, timestamp = '', duration = '', durationUnits = '', durationUnknown = false, typeOfExposure = '', routeOfExposure = [], uuid) => ({
  type: ADD_AGENT,
  id,
  agentId: uuid || generateUuid(),
  interlocutorAgentName,
  quantity,
  quantityUnits,
  quantityUnknown,
  timestamp,
  duration,
  durationUnits,
  durationUnknown,
  typeOfExposure,
  routeOfExposure,
});

export const addAgentCentreAgent = (id, agentId, name, url, quantity, units) => ({
  type: ADD_AGENT_CENTRE_AGENT,
  id,
  agentId,
  name,
  url,
  quantity,
  units,
});

export const deleteAgent = (id, agentId, agentName) => ({
  type: DELETE_AGENT,
  id,
  agentId,
  agentName,
});

export const hideAgentModal = () => ({
  type: HIDE_AGENT_MODAL,
});

export const removeAgentCentreAgent = (id, agentId, index, name) => ({
  type: REMOVE_AGENT_CENTRE_AGENT,
  id,
  agentId,
  index,
  name,
});

export const resetAgentView = () => ({
  type: RESET_AGENT_VIEW,
});

export const resetQuickView = () => ({
  type: RESET_QUICK_VIEW,
});

export const setAgentTab = (tab) => ({
  type: SET_AGENT_TAB,
  tab,
});

export const showAgentModal = (requestIx) => ({
  type: SHOW_AGENT_MODAL,
  requestIx,
});

export const updateAgentCategory = (id, agentId, old, category) => ({
  type: UPDATE_AGENT_CATEGORY,
  id,
  agentId,
  old,
  category,
});

export const updateAgentCentreAgent = (id, agentId, index, name, url, quantity, units) => ({
  type: UPDATE_AGENT_CENTRE_AGENT,
  id,
  agentId,
  index,
  name,
  url,
  quantity,
  units,
});

export const updateAgentDuration = (id, agentId, oldDuration, duration, oldDurationUnits, durationUnits, oldDurationUnknown, durationUnknown) => ({
  type: UPDATE_AGENT_DURATION,
  id,
  agentId,
  oldDuration,
  duration,
  oldDurationUnits,
  durationUnits,
  oldDurationUnknown,
  durationUnknown,
});

export const updateAgentEUPCS = (id, agentId, old, eupcs) => ({
  type: UPDATE_AGENT_EUPCS,
  id,
  agentId,
  old,
  eupcs,
});

export const updateAgentIntendedUseGiven = (id, agentId, old, intendedUseGiven) => ({
  type: UPDATE_AGENT_INTENDED_USE_GIVEN,
  id,
  agentId,
  old,
  intendedUseGiven,
});

export const updateAgentInterlocutorAgentName = (id, agentId, interlocutorAgentName) => ({
  type: UPDATE_AGENT_INTERLOCUTOR_AGENT_NAME,
  id,
  agentId,
  interlocutorAgentName,
});

export const updateAgentIsPatientsOwnMedication = (id, agentId, old, isPatientsOwnMedication) => ({
  type: UPDATE_AGENT_IS_PATIENTS_OWN_MEDICATION,
  id,
  agentId,
  old,
  isPatientsOwnMedication,
});

export const updateAgentQuantity = (id, agentId, oldQuantity, quantity, oldQuantityUnits, quantityUnits, oldQuantityUnknown, quantityUnknown) => ({
  type: UPDATE_AGENT_QUANTITY,
  id,
  agentId,
  oldQuantity,
  quantity,
  oldQuantityUnits,
  quantityUnits,
  oldQuantityUnknown,
  quantityUnknown,
});

export const updateAgentRouteOfExposure = (id, agentId, old, routeOfExposure) => ({
  type: UPDATE_AGENT_ROUTE_OF_EXPOSURE,
  id,
  agentId,
  old,
  routeOfExposure,
});

export const updateAgentTimeOfExposure = (id, agentId, oldTimeOfExposure, timeOfExposure) => ({
  type: UPDATE_AGENT_TIME_OF_EXPOSURE,
  id,
  agentId,
  oldTimeOfExposure,
  timeOfExposure,
});

export const updateAgentTimeSinceExposure = (id, agentId, old, timeSinceExposure) => ({
  type: UPDATE_AGENT_TIME_SINCE_EXPOSURE,
  id,
  agentId,
  old,
  timeSinceExposure,
});

export const updateAgentTimeSinceExposureUnits = (id, agentId, old, timeSinceExposureUnits) => ({
  type: UPDATE_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  id,
  agentId,
  old,
  timeSinceExposureUnits,
});

export const updateAgentTypeOfExposure = (id, agentId, old, typeOfExposure) => ({
  type: UPDATE_AGENT_TYPE_OF_EXPOSURE,
  id,
  agentId,
  old,
  typeOfExposure,
});

export const updateAgentUseType = (id, agentId, old, useType) => ({
  type: UPDATE_AGENT_USE_TYPE,
  id,
  agentId,
  old,
  useType,
});

export const updateQuickViewAgentDuration = (duration) => ({
  type: UPDATE_QUICK_VIEW_AGENT_DURATION,
  duration,
});

export const updateQuickViewAgentDurationUnits = (durationUnits) => ({
  type: UPDATE_QUICK_VIEW_AGENT_DURATION_UNITS,
  durationUnits,
});

export const updateQuickViewAgentDurationUnknown = (durationUnknown) => ({
  type: UPDATE_QUICK_VIEW_AGENT_DURATION_UNKNOWN,
  durationUnknown,
});

export const updateQuickViewAgentName = (name) => ({
  type: UPDATE_QUICK_VIEW_AGENT_NAME,
  interlocutorAgentName: name,
});

export const updateQuickViewAgentQuantity = (quantity) => ({
  type: UPDATE_QUICK_VIEW_AGENT_QUANTITY,
  quantity,
});

export const updateQuickViewAgentQuantityUnits = (quantityUnits) => ({
  type: UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNITS,
  quantityUnits,
});

export const updateQuickViewAgentQuantityUnknown = (quantityUnknown) => ({
  type: UPDATE_QUICK_VIEW_AGENT_QUANTITY_UNKNOWN,
  quantityUnknown,
});

export const updateQuickViewAgentRouteOfExposure = (routeOfExposure) => ({
  type: UPDATE_QUICK_VIEW_AGENT_ROUTE_OF_EXPOSURE,
  routeOfExposure,
});

export const updateQuickViewAgentTimeOfExposure = (timeOfExposure) => ({
  type: UPDATE_QUICK_VIEW_AGENT_TIME_OF_EXPOSURE,
  timeOfExposure,
});

export const updateQuickViewAgentTimeSinceExposure = (timeSinceExposure) => ({
  type: UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE,
  timeSinceExposure,
});

export const updateQuickViewAgentTimeSinceExposureUnits = (timeSinceExposureUnits) => ({
  type: UPDATE_QUICK_VIEW_AGENT_TIME_SINCE_EXPOSURE_UNITS,
  timeSinceExposureUnits,
});

export const updateQuickViewAgentTypeOfExposure = (typeOfExposure) => ({
  type: UPDATE_QUICK_VIEW_AGENT_TYPE_OF_EXPOSURE,
  typeOfExposure,
});
